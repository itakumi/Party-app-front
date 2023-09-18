// ImageCropper.js
import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function ImageCropper({ fileData, setFileData }) {
  const [croppedDataUrl, setCroppedDataUrl] = useState(null);

  const cropperRef = useRef(null);

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setFileData(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    console.log(cropperRef.current);

    const x = 50; // 切り取り範囲の左上隅のx座標
    const y = 50; // 切り取り範囲の左上隅のy座標
    const fillColor = "#ffffff"; // 空白部分を白色で塗りつぶす

    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
        x,
        y,
        fillColor,
      });
      if (croppedCanvas === null) {
        // クロップされたキャンバスがnullの場合のエラーハンドリング
        console.error("クロップに失敗しました");
        return;
      } else {
        setCroppedDataUrl(croppedCanvas.toDataURL());
      }
    }
  };

  useEffect(() => {// useStateが非同期なのでこれで対処する
    setFileData(croppedDataUrl);
    console.log(croppedDataUrl);
    console.log(fileData);
  }, [croppedDataUrl]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={onFileInputChange} />
      {fileData && croppedDataUrl === null && (
        <div>
          <Cropper
            ref={cropperRef}
            src={fileData}
            style={{ height: "100%", width: "100%" }}
            movable={false}
            aspectRatio={ 5 / 3 }
            cropBoxResizable={false}
          />
          <button onClick={handleCrop}>トリミング</button>
        </div>
      )}
      {croppedDataUrl && (
        <img
          src={croppedDataUrl}
          alt="トリミング後の画像"
          style={{ width: "auto", height: "100%", maxWidth: "100%" }}
          />
      )}
    </div>
  );
}

export default ImageCropper;
