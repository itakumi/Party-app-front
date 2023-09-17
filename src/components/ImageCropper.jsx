// ImageCropper.js
import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function ImageCropper() {
  const [fileData, setFileData] = useState(null);
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
    const width = 200; // 切り取り範囲の幅
    const height = 150; // 切り取り範囲の高さ
    const fillColor = '#ffffff'; // 空白部分を白色で塗りつぶす

    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas({ x, y, width, height, fillColor });
      if (croppedCanvas === null) {
        // クロップされたキャンバスがnullの場合のエラーハンドリング
        console.error("クロップに失敗しました");
        return;
      }
      const croppedDataUrl = croppedCanvas.toDataURL();
      console.log(croppedDataUrl);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onFileInputChange} />
      {fileData && (
        <div>
          <Cropper
            ref={cropperRef}
            src={fileData}
            style={{ height: 400, width: "100%" }}
          />
          <button onClick={handleCrop}>トリミング</button>
          {/* <button onClick={handleCrop}>トリミング</button> */}
        </div>
      )}
    </div>
  );
}

export default ImageCropper;
