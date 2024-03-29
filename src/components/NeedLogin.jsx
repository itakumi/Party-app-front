import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "../App.css";
import styles from "./NeedLogin.module.css";

export const NeedLogin = ({ langValue, setSubmitting }) => {
	return (
		<>
			<div className={styles.UnderHalfcircle}>
				<h1 class="page_title">Party App</h1>
				<div className="centered-container">
					<div class="card_radius">
						<h4 style={{ color: "white" }}>Oops! You need to login/SignUp</h4>
						<Card sx={{ minWidth: 275, maxWidth: "80%" }} class="card_radius">
							{/* 私たちにCard contentの裏がCardなので、CSSが一見見えません */}
							<CardContent className={styles.WholeCard + " card_radius"}>
								<CardActions className={styles.BlueButton}>
									<Button
										size="small"
										onClick={() => (document.location = "/SignUp")}
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
										onClick={() => (document.location = "/")}
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
