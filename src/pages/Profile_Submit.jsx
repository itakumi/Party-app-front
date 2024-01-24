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
import { useState } from "react";
import ImageCropper from "../components/ImageCropper"; // ImageCropperコンポーネントのファイルパスを指定
import "../App.css";
import { useCookies } from "react-cookie";
import { NeedLogin } from "../components/NeedLogin";
import { useLocation } from "react-router-dom";
import styles from "./profile-submit.module.css";
import { Select, MenuItem } from "@mui/material";
import { teamList } from "../components/TeamList";

export default function ProfileSubmit({ langValue, setSubmitting }) {
  const location = useLocation();
  const myinfo = location.state;

  const [nameValue, setNameValue] = useState(myinfo ? myinfo.name : "");
  const [teamValue, setTeamValue] = useState(myinfo ? myinfo.team : "");
  const [othersValue, setOthersValue] = useState(myinfo ? myinfo.others : "");
  const [fileData, setFileData] = useState(myinfo ? myinfo.fileData : ""); // ファイルデータを保持するステート
  const [croppedData, setCroppedData] = useState(null);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorOthersMessage, setErrorOthersMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);

  const handleSubmit = () => {
    // データをJSON形式に整形
    const postData = {
      id: cookies["session"]["id"],
      name: nameValue,
      team: teamValue,
      others: othersValue,
      fileData: croppedData,
    };

    // PythonバックエンドのURLを指定
    const backendURL = process.env.REACT_APP_BACKEND_ENTRYPOINT + "/backend"; // あなたのバックエンドのURLに置き換えてください

    //SubmitしたタイミングでCookieのteamをprofileに記入したteamにセットし直す。
    //全部[name]: [name]みたいに値をセットするのは面倒くさいので、以下の書き方でteamだけ変更する。
    setCookie("session", { ...cookies["session"], team: teamValue });

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
        // setCookie("session", data["user"]);
        window.alert(langValue.submit_complete);
        document.location = process.env.PUBLIC_URL + "/Profiles";
      })
      .catch((error) => {
        // エラーハンドリングを行うコードをここに追加
        console.error("Error:", error);
        window.alert(langValue.submit_fail);
      });
  };

  const handleOpenSubmitDialog = () => {
    if (
      nameValue.length !== 0 &&
      teamValue.length !== 0 &&
      othersValue.length !== 0 &&
      croppedData != null
    ) {
      //各textfieldに何かしら入力があった時の処理
      if (
        nameValue.match(/\S/g) === null ||
        teamValue.match(/\S/g) === null ||
        othersValue.match(/\S/g) === null
      ) {
        // 空白のみの入力があった場合
        window.alert(langValue.donot_input_blankonly);
      } else {
        //空白のみの入力がなかった場合
        if (
          nameValue.length <= 30 &&
          teamValue.length <= 30 &&
          othersValue.length <= 300
        ) {
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
      if (nameValue.length === 0) {
        setErrorNameMessage(langValue.mandatory);
      }
      if (othersValue.length === 0) {
        setErrorOthersMessage(langValue.mandatory);
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

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    setNameValue(inputValue);

    if (inputValue.length <= 30) {
      setErrorNameMessage("");
    } else {
      setErrorNameMessage(langValue.please_input_30);
    }
  };

  const handleTeamChange = (event) => {
    const inputValue = event.target.value;
    setTeamValue(inputValue);
  };

  const handleOthersChange = (event) => {
    const inputValue = event.target.value;
    setOthersValue(inputValue);

    if (inputValue.length <= 300) {
      setErrorOthersMessage("");
    } else {
      setErrorOthersMessage(langValue.please_input_300);
    }
  };

  // const download = () => {
  //   fetch(process.env.REACT_APP_BACKEND_ENTRYPOINT + "/download_db");
  // };

  return (
    <>
      {cookies["session"] ? (
        <>
          <div className="d-flex">
            <p style={{ marginRight: "10px" }} className="User_Name">
              User: {cookies["session"]["username"]}
            </p>
            <p
              style={{
                cursor: "pointer",
                color: "#6b68ff",
                border: "0.5px solid #6b68ff",
                borderRadius: "10%",
              }}
              onClick={() => {
                removeCookie("session");
                document.location = "/";
              }}
            >
              {langValue.Log_out}
            </p>
          </div>
          <h1
            className={styles.Halfcircle + " text"}
            style={{
              marginBottom: "0px",
              marginTop: "0px",
              display: "block",
              // transform: "translate(0%, 50%)",
              fontWeight: "bold",
            }}
          >
            <br></br>
            {langValue.Profile_input}
          </h1>
          <div className={styles.BlueBack}>
            <div className="centered-container-Profile-Submit">
              <div className={styles.BlueBack} style={{ marginTop: "30px" }}>
                <Card
                  sx={{ minWidth: 275, maxWidth: 300 }}
                  style={{ background: "#6b68ff" }}
                >
                  <CardContent className={styles.WholeCard + " card_radius"}>
                    <Typography
                      sx={{ fontSize: 14, width: "90%" }}
                      color="text.secondary"
                      gutterBottom
                      className={styles.ovalTextField}
                    >
                      <br />
                      <TextField
                        label="Name"
                        value={nameValue} //変数みたいな感じ。
                        onChange={handleNameChange} //こっちは入力して変更したときのイベント
                        error={errorNameMessage !== ""}
                        helperText={errorNameMessage}
                      />
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, width: "90%", marginTop: "2vh" }} // 両方のTypographyコンポーネントに共通の幅を指定
                      color="text.secondary"
                      gutterBottom
                      className={styles.ovalTextField}
                    >
                      <Select
                        sx={{ width: "100%" }} // Selectコンポーネントには100%の幅を指定
                        labelId="team"
                        value={teamValue}
                        onChange={handleTeamChange}
                        displayEmpty
                        inputProps={{ "aria-label": "team" }}
                      >
                        <MenuItem value="" disabled style={{ display: "none" }}>
                          <em style={{ color: "gray" }}>Team</em>
                        </MenuItem>
                        {teamList.map((team) => (
                          <MenuItem key={team} value={team}>
                            {team}
                          </MenuItem>
                        ))}
                      </Select>
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, width: "90%" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <br />
                      <TextField
                        label={langValue.others}
                        value={othersValue}
                        onChange={handleOthersChange}
                        error={errorOthersMessage !== ""}
                        helperText={errorOthersMessage}
                        className={styles.ovalTextField}
                      />{" "}
                    </Typography>

                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {langValue.your_image}
                      <div className={styles.ChooseFile}>
                        <ImageCropper
                          fileData={fileData}
                          setFileData={setFileData}
                          croppedData={croppedData}
                          setCroppedData={setCroppedData}
                          langValue={langValue}
                        />
                      </div>
                    </Typography>

                    <br />

                    <CardActions className={styles.BlueButton}>
                      <Button
                        size="small"
                        onClick={handleOpenSubmitDialog}
                        style={{
                          margin: "auto",
                          width: "50%",
                        }}
                      >
                        <div
                          className={` ${
                            fileData && !croppedData ? "SubmitGray" : ""
                          }`}
                          style={{
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {langValue.submit}
                        </div>
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
                <a href={process.env.PUBLIC_URL + "/Profiles"}>
                  {/* 遷移してくれる */}
                  <h6
                    style={{
                      color: "white",
                    }}
                  >
                    {langValue.Back}
                  </h6>
                </a>
              </div>

              <Dialog
                open={isSubmitDialogOpen}
                onClose={handleCloseSubmitDialog}
              >
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
        </>
      ) : (
        <NeedLogin langValue={langValue} />
      )}
    </>
  );
}
