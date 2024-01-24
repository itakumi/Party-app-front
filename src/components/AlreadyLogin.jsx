import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "../App.css";
import styles from "./AlreadyLogin.module.css";

export const AlreadyLogin = ({ langValue, setSubmitting }) => {
  return (
    <>
      <div className={styles.UnderHalfcircle}>
        <h1 class="page_title">Party App</h1>
        <div className="centered-container">
          <div class="card_radius">
            <h4 style={{ color: "white", textAlign: "center" }}>
              You are already login/SignUp
            </h4>
            <Card
              sx={{ minWidth: "100%", maxWidth: "80%" }}
              class="card_radius"
            >
              {/* 私たちにCard contentの裏がCardなので、CSSが一見見えません */}
              <CardContent className={styles.WholeCard + " card_radius"}>
                <CardActions className={styles.BlueButton}>
                  <Button
                    size="small"
                    onClick={() =>
                      (document.location = process.env.PUBLIC_URL + "/Profiles")
                    }
                    style={{
                      margin: "auto",
                      width: "70%",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {langValue.Jump_profiles}
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
                      (document.location =
                        process.env.PUBLIC_URL + "/Profile_Submit")
                    }
                    size="small"
                    style={{
                      margin: "auto",
                      width: "70%",
                    }}
                    className={styles.ovalTextField + " center-card-text"}
                  >
                    <div
                      style={{
                        color: "#6b68ff",
                        fontWeight: "bold",
                      }}
                    >
                      {langValue.Jump_Profile_Submit}
                    </div>
                  </Button>
                  {/* </Link> */}
                </CardActions>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
