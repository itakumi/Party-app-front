import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Message() {
  const [nameValue, setNameValue] = useState("");
  const [teamValue, setTeamValue] = useState("");
  const [othersValue, setOthersValue] = useState("");
  const [fileData, setFileData] = useState(null); // ファイルデータを保持するステート

  console.log(nameValue + " " + teamValue + " " + othersValue);

  const onFileInputChange = (event) => {
    const selectedFile = event.target.files[0]; // 最初の選択されたファイルを取得

    if (selectedFile) {
      const reader = new FileReader();

      // ファイルの読み込みが完了したときの処理
      reader.onload = (e) => {
        const fileBinaryData = e.target.result; // ファイルの生データ（バイナリデータ）を取得

        // ファイルの生データをbase64に変換
        const base64Data = btoa(fileBinaryData);

        // ファイルのbase64でエンコードしたデータをステートに設定
        setFileData(base64Data);
      };

      // ファイルを読み込む
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleSubmit = () => {
    // データをJSON形式に整形
    const postData = {
      name: nameValue,
      team: teamValue,
      others: othersValue,
      fileData: fileData,
    };

    console.log("File Data:", fileData); // fileDataの中身をログに出力

    // PythonバックエンドのURLを指定
    const backendURL = "http://127.0.0.1:5000/backend"; // あなたのバックエンドのURLに置き換えてください

    // データをPOSTリクエストで送信
    fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        // レスポンスを処理するコードをここに追加
        console.log(data);
      })
      .catch((error) => {
        // エラーハンドリングを行うコードをここに追加
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Card sx={{ minWidth: 275, maxWidth: 300 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name / Nickname:
            <br />
            <TextField
              label="Name"
              value={nameValue} //変数みたいな感じ。
              onChange={(event) => setNameValue(event.target.value)} //こっちは入力して変更したときのイベント
            />{" "}
            {/* 名前 */}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Team:
            <br />
            <TextField
              label="Team"
              value={teamValue}
              onChange={(event) => setTeamValue(event.target.value)} //こっちは入力して変更したときのイベント
            />{" "}
            {/* チーム */}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Others{"("}hobby, greetings, etc...{")"}:
            <br />
            {/* その他 */}
            <TextField
              label="Others"
              value={othersValue}
              onChange={(event) => setOthersValue(event.target.value)} //こっちは入力して変更したときのイベント
            />{" "}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Your image:
            {/* 画像 */}
            <div>
              {/* <button onClick={fileUpload}>ファイルアップロード</button> */}
              <input
                type="file"
                accept="image/*"
                onChange={onFileInputChange}
              />
            </div>
            {fileData && (
              <div>
                <img src={`data:image/jpeg;base64,${fileData}`} alt="選択された画像" />
              </div>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
