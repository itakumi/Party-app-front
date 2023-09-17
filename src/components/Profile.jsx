import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function MediaCard({ langValue }) {
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleDelete = (itemId) => {
    setItemToDelete(itemId);
    setIsDeleteDialogOpen(true);
  };

  const deleteItem = (id) => {
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

    // 削除が完了したらダイアログを閉じる
    setIsDeleteDialogOpen(false);
  };

  const confirmDelete = () => {
    // 実際の削除処理を行う
    // itemToDelete を使用してカードを削除するコードをここに追加
    deleteItem(itemToDelete);
  };

  const cancelDelete = () => {
    // 削除をキャンセルした場合、ダイアログを閉じる
    setIsDeleteDialogOpen(false);
  };

  

  console.log(jsonData);
  return (
    <>
      <div>
        {loading ? (
          <>
            <div className="popup-overlay">
              <div className="popup-content">
                <ReactLoading
                  type="spin"
                  color="#000000"
                  height="50px"
                  width="50px"
                  className="mx-auto"
                />
                <p className="text-center mt-3">Loading</p>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {jsonData.map((item, index) => (
              <div key={index} style={{ flexBasis: "50%", padding: "10px" }}>
                <Card
                  variant="outlined"
                  style={{ width: "100%", height: "525px" }}
                >
                  {/* 画像を表示 */}
                  <img
                    src={`data:image/png;base64,${item.fileData}`}
                    alt="Image"
                    style={{ width: "100%", height: "35%" }}
                  />
                  <CardContent>
                    <h6 style={{ whiteSpace: "pre-line" }}>{item.name.match(/.{1,17}/g).join('\n')}</h6>
                    <div style={{ whiteSpace: "pre-line" }}>Team: {item.team.match(/.{1,17}/g).join('\n')}</div>
                    <div style={{ whiteSpace: "pre-line" }}>{item.others.match(/.{1,17}/g).join('\n')}</div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleDelete(item.id)}>
                      {" "}
                      {langValue.delete}
                    </Button>
                  </CardActions>
                </Card>

                {/* 削除確認ダイアログ */}
                <Dialog open={isDeleteDialogOpen} onClose={cancelDelete}>
                  <DialogTitle>削除の確認</DialogTitle>
                  <DialogContent>
                    <DialogContentText>本当に削除しますか？</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                      いいえ
                    </Button>
                    <Button onClick={confirmDelete} color="primary">
                      はい
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MediaCard;
