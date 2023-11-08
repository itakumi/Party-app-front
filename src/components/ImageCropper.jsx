// ImageCropper.js
import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@mui/material";

function ImageCropper({
  fileData,
  setFileData,
  croppedData,
  setCroppedData,
  langValue,
}) {
  const [crop, setCrop] = useState({ x: 50, y: 50 });
  console.log("oooooooooooooooooooooooooo");

  const cropperRef = useRef(null);

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setCroppedData(null);

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
        setCroppedData(croppedCanvas.toDataURL());
      }
    }
  };

  // トリミング位置をリセットする関数
  const resetCrop = () => {
    if (cropperRef.current) {
      cropperRef.current.cropper.reset();
    }
  };

  return (
    <div>
      <label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        {/* <Button variant="contained">File Select</Button> */}
        <div
          style={{
            display: "block",
            padding: "8px 16px",
            backgroundColor: "#c6c6ff",
            color: "#6b68ff",
            borderRadius: "4px",
            cursor: "pointer",
            borderRadius: "40px 40px",
            border: "1px solid #6b68ff",
          }}
        >
          {langValue.file_choose}
        </div>
      </label>
      {fileData && croppedData === null && (
        <div>
          <Cropper
            ref={cropperRef}
            src={fileData}
            style={{ height: "100%", width: "100%" }}
            movable={false}
            aspectRatio={5 / 3}
            cropBoxResizable={true}
            crop={crop}
            dragMode="move"
            // cropBoxMovable={false}
          />
          <button onClick={handleCrop}>{langValue.trimming}</button>
          <button onClick={resetCrop}>{langValue.trimming_reset}</button>
        </div>
      )}
      {croppedData && (
        <img
          src={croppedData}
          alt="トリミング後の画像"
          style={{ width: "auto", height: "auto", maxWidth: "100%" }}
        />
      )}
    </div>
  );
}

export default ImageCropper;
