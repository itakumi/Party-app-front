import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useState, useRef, useEffect } from "react";
import "../App.css";
import { createStyles } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    WholeCard: {
      color: "black",
      background: "#fafad2",
    },
    BlueButton: {
      color: "white",
      background: "#6b68ff",
      // borderRadius: "40%",
      borderRadius: "40px 40px",
    },
    WhiteButton: {
      color: "#6b68ff",
      background: "white",
      borderRadius: "40px 40px",
      border: "1px solid #6b68ff",
    },
    BlueBack: {
      background: "#6b68ff",
      height: "50%",
    },
    // textField: { [`& fieldset`]: { borderRadius: "40% 40% 40% 40%" } },
    ovalTextField: {
      "& .MuiOutlinedInput-root": { borderRadius: "40px 40px" },
      // borderRadius: "40px 40px"
      // background: "red",
    },

    UnderHalfcircle: {
      width: "100%" /* 半円の横幅 */,
      height: "50vh" /* 半円の高さ */,
      background: "#6b68ff" /* 半円の背景色 */,
      borderRadius: "0 0 25% 25%",
    },
  })
);

export const LogIn = ({ langValue, setSubmitting }) => {
  const [mailValue, setMailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  const classes = useStyles();

  const handleSubmit = () => {
    // データをJSON形式に整形
    const postData = {
      mail: mailValue,
      pass: passValue,
    };

    // PythonバックエンドのURLを指定
    const backendURL = "http://localhost:5000/backend"; // あなたのバックエンドのURLに置き換えてください

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
        setSubmitting(false);
        window.alert(langValue.submit_complete);
        window.location.reload();
      })
      .catch((error) => {
        // エラーハンドリングを行うコードをここに追加
        console.error("Error:", error);
        window.alert(langValue.submit_fail);
      });
  };

  const handleMailChange = (event) => {
    const inputValue = event.target.value;
    setMailValue(inputValue);

    // if (inputValue.length <= 30) {
    //   setErrorNameMessage("");
    // } else {
    //   setErrorNameMessage(langValue.please_input_30);
    // }
  };

  const handlePassChange = (event) => {
    const inputValue = event.target.value;
    setPassValue(inputValue);

    // if (inputValue.length >= 8) {
    //   setErrorNameMessage("");
    // } else {
    //   setErrorNameMessage(langValue.please_input_30);
    // }
  };

  const handleOpenSubmitDialog = () => {
    if (mailValue.length != 0 && passValue.length != 0) {
      //各textfieldに何かしら入力があった時の処理
      if (mailValue.match(/\S/g) === null || passValue.match(/\S/g) === null) {
        // 空白のみの入力があった場合
        window.alert(langValue.donot_input_blankonly);
      } else {
        //空白のみの入力がなかった場合
        if (passValue.length >= 8) {
          // 文字数制限で合格した場合
          setIsSubmitDialogOpen(true);
        } else {
          //　文字数制限でアウトだった場合
          window.alert(langValue.input_too_long);
        }
      }
    } else {
      // 入力されていないtextfieldがある場合の処理
      window.alert(langValue.input_all);
      if (mailValue.length == 0) {
        // setErrorNameMessage(langValue.mandatory);
      }
      if (passValue.length == 0) {
        // setErrorTeamMessage(langValue.mandatory);
      }
    }
  };

  const handleConfirmSubmit = () => {
    // ボタンがクリックされたときの処理をここに記述
    // たとえば、フォームの送信処理を行う

    handleSubmit();

    // ポップアップを閉じる
    setIsSubmitDialogOpen(false);
    setSubmitting(true); //送信中のポップアップを表示するためtrueにする
  };

  const handleCloseSubmitDialog = () => {
    setIsSubmitDialogOpen(false);
  };

  return (
    <>
      <div className={classes.UnderHalfcircle}>
        <h1 class="page_title">Party App</h1>
        <div className="centered-container">
          <div class="card_radius">
            <Card sx={{ minWidth: 275, maxWidth: 300 }} class="card_radius">
              {/* 私たちにCard contentの裏がCardなので、CSSが一見見えません */}
              <CardContent className={classes.WholeCard + " card_radius"}>
                <h3 class="center-card-text">{langValue.Log_in}</h3>

                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  className={classes.ovalTextField}
                >
                  <TextField
                    label={langValue.Email_address}
                    value={mailValue} //変数みたいな感じ。
                    onChange={handleMailChange}
                    // className="round_shape"
                    // error={errorNameMessage !== ""}
                    // helperText={errorNameMessage}
                  />
                  {/* Mail */}
                </Typography>

                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  className={classes.ovalTextField}
                >
                  <br />
                  <TextField
                    label={langValue.Password}
                    value={passValue}
                    onChange={handlePassChange}
                    // error={errorTeamMessage !== ""}
                    // helperText={errorTeamMessage}
                  />{" "}
                  {/* Password */}
                </Typography>

                <div className={"center-card-text" + " blueword"}>
                  {langValue.forget_pass}
                </div>

                <br />

                <CardActions className={classes.BlueButton}>
                  <Button
                    size="small"
                    onClick={handleOpenSubmitDialog}
                    style={{
                      margin: "auto",
                      width: "50%",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {langValue.Log_in}
                    </div>
                  </Button>
                </CardActions>

                <div className={classes.WholeCard + " center-card-text"}>
                  {langValue.or}
                </div>

                <CardActions
                  className={classes.WhiteButton + " center-card-text"}
                >
                  <Button
                    size="small"
                    onClick={handleOpenSubmitDialog}
                    style={{
                      margin: "auto",
                      width: "50%",
                    }}
                    className={classes.ovalTextField + " center-card-text"}
                  >
                    <div
                      style={{
                        color: "#6b68ff",
                        fontWeight: "bold",
                      }}
                    >
                      {langValue.Sign_up}
                    </div>
                  </Button>
                </CardActions>
              </CardContent>
            </Card>

            <Dialog open={isSubmitDialogOpen} onClose={handleCloseSubmitDialog}>
              <DialogTitle>{langValue.confirm}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {langValue.really_submit_question}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseSubmitDialog}>
                  {langValue.cancel}
                </Button>
                <Button onClick={handleConfirmSubmit}>
                  {langValue.submit}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};
