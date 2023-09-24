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
  const [showAllOthers, setShowAllOthers] = useState(false);
  const [showFullText, setShowFullText] = useState([]);

  // サーバーからJSONデータを取得する関数
  const fetchData = async () => {
    try {
      const response = await fetch("http://0.0.0.0:10000/get_json_data");
      const data = await response.json();
      setJsonData(data); // JSONデータをステートに設定
      setLoading(false);
      console.log(data);
      // 長さが20で、すべての要素がfalseの配列を作成
      const myArray = new Array(data.length).fill(false);
      setShowFullText(myArray);
    } catch (error) {
      console.error("データの取得に失敗しました", error);
    }
  };

  useEffect(() => {
    fetchData(); // データを取得する関数を実行
  }, []); //［］なら最初だけ実行する

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
        fetchData();
        window.alert("削除しました！リロードします！");
        // window.location.reload();
      })
      .catch((error) => {
        // エラーハンドリングを行うコードをここに追加
        console.error("Error:", error);
        // window.alert("削除できませんでした");
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

  // 表示するテキストの最大文字数
  const maxCharacters = 17;

  // テキストを折り返す関数
  const foldText = (text) => {
    return text.length > maxCharacters ? text.slice(0, maxCharacters) : text;
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
              <div
                key={index}
                style={{
                  flexBasis: "50%",
                  padding: "10px",
                  maxWidth: "50%",
                }}
              >
                <Card
                  variant="outlined"
                  style={{
                    width: "100%",
                    height: "auto",
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ flex: "3" }}>
                    <img
                      src={item.fileData}
                      alt="Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <CardContent
                    style={{
                      flex: "2",
                      wordWrap: "break-word", // word-wrapの設定
                    }}
                  >
                    {/* <div
                      style={{
                        maxHeight: showAllOthers ? "none" : "2.4em", // 2.4emは約2行分の高さ
                        WebkitLineClamp: showAllOthers ? "unset" : 2, // ブラウザごとに異なる可能性があるので注意
                        display: "-webkit-box", // ブラウザごとに必要
                      }}
                    > */}
                    <h5
                      style={{
                        whiteSpace: "pre-line",
                        width: "100%",
                      }}
                    >
                      {item.name}
                      {/* {item.name.match(/.{1,17}/g).join("\n")} */}
                    </h5>
                    <div
                      style={{
                        whiteSpace: "pre-line",
                        width: "100%",
                      }}
                    >
                      Team: {item.team}
                      {/* Team: {item.team.match(/.{1,17}/g).join("\n")} */}
                    </div>
                    <div
                      style={{
                        whiteSpace: "pre-line",
                        width: "100%",
                      }}
                    >
                      {showFullText[index]
                        ? item.others
                        : foldText(item.others)}
                      {item.others.length > maxCharacters && (
                        <span
                          onClick={() => {
                            const newArray = [...showFullText]; // 配列のコピーを作成
                            newArray[index] = !newArray[index]; // インデックスiの要素を反転
                            setShowFullText(newArray); // 新しい配列でsetStateを更新
                          }}
                          style={{
                            cursor: "pointer",
                            color: "blue",
                            marginLeft: "5px",
                          }}
                        >
                          {showFullText[index] ? "▲" : "▼"}
                        </span>
                      )}

                      {/* {item.others} */}
                      {/* {item.others.match(/.{1,17}/g).join("\n")} */}
                    </div>
                    {/* {item.name.length +
                        item.team.length +
                        item.others.length >
                        50 && (
                        <button
                          onClick={() => setShowAllOthers(!showAllOthers)}
                        >
                          {showAllOthers ? "折りたたむ" : "もっと見る"}
                        </button>
                      )}{" "} */}
                    {/* </div> */}
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
