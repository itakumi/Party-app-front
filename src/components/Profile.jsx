import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

export default function MediaCard() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    // サーバーからJSONデータを取得する関数
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_json_data");
        const data = await response.json();
        setJsonData(data); // JSONデータをステートに設定
        console.log(data);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    fetchData(); // データを取得する関数を実行
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {jsonData.map((item, index) => (
      <div key={index} style={{ flexBasis: '50%', padding: '10px' }}>
        <Card variant="outlined" style={{ width: '100%', height: '300px' }}>
          {/* 画像を表示 */}
          <img src={`data:image/png;base64,${item.image}`} alt="Image" style={{ width: '100%', height: '40%' }} />
          <CardContent>
            <h6>{item.name}</h6>
            <div>Team: {item.Place}</div>
            <div>{item.Birth}</div>
          </CardContent>
          <CardActions>
          <Button size="small">Delete</Button>
        </CardActions>
        </Card>
      </div>
    ))}
  </div>
  );
}
