import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { langdata } from "./Lang_pack";

export default function MediaCard({ langValue }) {
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // サーバーからJSONデータを取得する関数
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_json_data");
        const data = await response.json();
        setJsonData(data); // JSONデータをステートに設定
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    fetchData(); // データを取得する関数を実行
  }, []);

  const handleDelete = (id) => {
    console.log(id);

    const postData = {
      id: id,
    };

    // PythonバックエンドのURLを指定
    const backendURL = "http://127.0.0.1:5000/delete"; // あなたのバックエンドのURLに置き換えてください

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

  console.log(jsonData);
  return (
    <>
      <div>
        {loading ? (
          <>
            <ReactLoading
              type="spin"
              color="#000000"
              height="50px"
              width="50px"
              className="mx-auto"
            />
            <p className="text-center mt-3">Loading</p>
          </>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {jsonData.map((item, index) => (
              <div key={index} style={{ flexBasis: "50%", padding: "10px" }}>
                <Card
                  variant="outlined"
                  style={{ width: "100%", height: "300px" }}
                >
                  {/* 画像を表示 */}
                  <img
                    src={`data:image/png;base64,${item.fileData}`}
                    alt="Image"
                    style={{ width: "100%", height: "40%" }}
                  />
                  <CardContent>
                    <h6>{item.name}</h6>
                    <div>Team: {item.team}</div>
                    <div>{item.others}</div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleDelete(item.id)}>
                      {" "}
                      {langValue.delete}
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
