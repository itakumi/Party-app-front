import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useRef, useEffect, useMemo } from "react";
import "../App.css";
import { useCookies } from "react-cookie";
import { AlreadyLogin } from "../components/AlreadyLogin";
import styles from "./SignUp.module.css";

export const SignUp = ({ langValue, setSubmitting }) => {
  const [usernameValue, setUsernameValue] = useState("");
  const [mailValue, setMailValue] = useState("");
  const [emailIsOK, setEmailIsOK] = useState(true);
  const emailRef = useRef(0);
  const mailRegex = useMemo(() => {
    // ここで mailRegex オブジェクトを初期化して返します
    return new RegExp(
      /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]+@([a-zA-Z0-9][a-zA-Z0-9-]*\.)+[a-zA-Z0-9]+$/g
    );
  }, []);
  const passwordRegex = useMemo(() => {
    return new RegExp(/^[a-zA-Z0-9]{8,}$/g);
  }, []);
  const [passValue, setPassValue] = useState("");
  const passwordRef = useRef(0);
  const [passwordIsOK, setPasswordIsOK] = useState(true);
  const [confirmPassValue, setConfirmPassValue] = useState("");
  const [confirmationPasswordIsOK, setConfirmationPasswordIsOK] =
    useState(true);
  const [cookies, setCookie] = useCookies(["session"]);

  useEffect(() => {
    if (emailRef.current <= 1) {
      emailRef.current += 1;
    } else {
      setEmailIsOK(mailRegex.test(mailValue));
    }
  }, [mailValue, mailRegex]);

  useEffect(() => {
    if (passwordRef.current <= 1) {
      passwordRef.current += 1;
    } else {
      setPasswordIsOK(passwordRegex.test(passValue));
    }
  }, [passValue, passwordRegex]);
  useEffect(() => {
    setConfirmationPasswordIsOK(passValue === confirmPassValue);
  }, [passValue, confirmPassValue]);

  const handleSubmit = () => {
    // データをJSON形式に整形
    const postData = {
      username: usernameValue,
      mail: mailValue,
      pass: passValue,
    };

    // PythonバックエンドのURLを指定
    const backendURL = process.env.REACT_APP_BACKEND_ENTRYPOINT + "/SignUp"; // あなたのバックエンドのURLに置き換えてください
    if (
      usernameValue.length === 0 ||
      mailValue.length === 0 ||
      passValue.length === 0 ||
      confirmPassValue.length === 0
    ) {
      alert(
        "入力されていない項目があります。" +
          "\n" +
          "There are fields that have not been filled in."
      );
    } else if (emailIsOK && passwordIsOK && confirmationPasswordIsOK) {
      // データをPOSTリクエストで送信
      fetch(backendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (response.ok) {
            // ステータスコードが 200 の場合の処理
            return response.json();
          } else if (response.status === 400) {
            window.alert("Email already exists");
            // ステータスコードが 400 の場合の処理
            throw new Error("Email already exists");
          } else {
            // その他のステータスコードの場合の処理
            throw new Error(
              "Request failed with status code " + response.status
            );
          }
        })
        .then((data) => {
          // レスポンスを処理するコードをここに追加
          setSubmitting(false);
          window.alert(langValue.Signup_complete);
          setCookie("session", data["user"]);
          document.location = process.env.PUBLIC_URL + "/Profiles";
          // window.location.reload();
        })
        .catch((error) => {
          // エラーハンドリングを行うコードをここに追加
          console.error("Error:", error);
          window.alert(langValue.submit_fail);
        });
    } else {
      window.alert(langValue.Invalid_format_error);
    }
  };

  const handleUsernameChange = (event) => {
    const inputValue = event.target.value;
    setUsernameValue(inputValue);
  };

  const handleMailChange = (event) => {
    const inputValue = event.target.value;
    setMailValue(inputValue);
  };

  const handlePassChange = (event) => {
    const inputValue = event.target.value;
    setPassValue(inputValue);
  };

  const handleConfirmPassChange = (event) => {
    const inputValue = event.target.value;
    setConfirmPassValue(inputValue);
  };

  const handleConfirmSubmit = () => {
    handleSubmit();
    setSubmitting(true); //送信中のポップアップを表示するためtrueにする
  };

  function searchHandleKeyPress(e) {
    if (e.code === "Enter") {
      handleConfirmSubmit();
    }
    return false;
  }
  return (
    <>
      {cookies["session"] ? (
        <AlreadyLogin langValue={langValue} />
      ) : (
        <div className={styles.UnderHalfcircle}>
          <h1 class="page_title">Party App</h1>
          <div className="centered-container">
            <div class="card_radius">
              <Card sx={{ minWidth: 275, maxWidth: 300 }} class="card_radius">
                <CardContent className={styles.WholeCard + " card_radius"}>
                  <h3 class="center-card-text">{langValue.Sign_up}</h3>

                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className={styles.ovalTextField}
                  >
                    <TextField
                      label={langValue.User_name}
                      value={usernameValue} //変数みたいな感じ。
                      onChange={handleUsernameChange}
                      onKeyDown={(e) => searchHandleKeyPress(e)}
                    />
                  </Typography>

                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className={styles.ovalTextField}
                  >
                    <br />
                    <TextField
                      label={langValue.Email_address}
                      value={mailValue}
                      onChange={handleMailChange}
                      onKeyDown={(e) => searchHandleKeyPress(e)}
                      InputProps={{
                        sx: {
                          backgroundColor: !emailIsOK ? "indianred" : "inherit",
                        }, // 背景色を変更
                      }}
                    />
                    {emailIsOK || (
                      <h6 style={{ color: "#bf0000" }}>
                        {langValue.Invalid_email_format}
                      </h6>
                    )}
                  </Typography>

                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className={styles.ovalTextField}
                  >
                    <br />
                    <TextField
                      type="password"
                      label={langValue.Password}
                      value={passValue}
                      onChange={handlePassChange}
                      onKeyDown={(e) => searchHandleKeyPress(e)}
                      InputProps={{
                        sx: {
                          backgroundColor: !passwordIsOK
                            ? "indianred"
                            : "inherit",
                        }, // 背景色を変更
                      }}
                    />
                    {passwordIsOK || (
                      <h6 style={{ color: "#bf0000" }}>
                        {langValue.Invalid_pass_format}
                      </h6>
                    )}
                  </Typography>

                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className={styles.ovalTextField}
                  >
                    <br />
                    <TextField
                      type="password"
                      label={langValue.ConfirmPassword}
                      value={confirmPassValue}
                      onChange={handleConfirmPassChange}
                      onKeyDown={(e) => searchHandleKeyPress(e)}
                      InputProps={{
                        sx: {
                          backgroundColor: !confirmationPasswordIsOK
                            ? "indianred"
                            : "inherit",
                        }, // 背景色を変更
                      }}
                    />
                    {confirmationPasswordIsOK || (
                      <h6 style={{ color: "#bf0000" }}>
                        {langValue.Invalid_confirmpass_format}
                      </h6>
                    )}
                  </Typography>

                  <br />
                  <br />

                  <CardActions className={styles.BlueButton}>
                    <Button
                      size="small"
                      onClick={handleConfirmSubmit}
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
                        {langValue.Sign_up}
                      </div>
                    </Button>
                  </CardActions>

                  <div className={styles.WholeCard + " center-card-text"}>
                    {langValue.or}
                  </div>

                  <CardActions
                    className={styles.WhiteButton + " center-card-text"}
                  >
                    <Button
                      onClick={() =>
                        (document.location = process.env.PUBLIC_URL + "/")
                      }
                      size="small"
                      style={{
                        margin: "auto",
                        width: "50%",
                      }}
                      className={styles.ovalTextField + " center-card-text"}
                    >
                      <div
                        style={{
                          color: "#6b68ff",
                          fontWeight: "bold",
                        }}
                      >
                        {langValue.Log_in}
                      </div>
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
