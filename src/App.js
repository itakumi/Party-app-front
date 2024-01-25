import "./App.css";
import { langdata } from "./components/Lang_pack";
import { MenuItem, InputLabel, FormControl, Select, Box } from "@mui/material";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LogIn } from "./pages/LogIn";
import ProfileSubmit from "./pages/Profile_Submit";
import Profiles from "./pages/Profiles";
import { SignUp } from "./pages/SignUp";

function App() {
  const [langValue, setLangValue] = useState(langdata.English);
  const [submitting, setSubmitting] = useState(false);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLangValue(langdata[selectedLanguage]);
  };
  console.log("REACT_APP_PATH=" + process.env.REACT_APP_PATH);

  return (
    <>
      <Box
        sx={{
          minWidth: 130,
          maxWidth: 300,
          height: "50px",
          position: "absolute",
          top: 5,
          right: 10,
        }}
      >
        <FormControl fullWidth>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            style={{ width: "100%", textAlign: "center" }}
          >
            Language
          </InputLabel>
          <Select value={langValue.language} onChange={handleLanguageChange}>
            {Object.keys(langdata).map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Router basename={process.env.REACT_APP_PATH}>
        <Routes>
          <Route
            path="/"
            element={
              <LogIn langValue={langValue} setSubmitting={setSubmitting} />
            }
          />
          <Route
            path="/SignUp"
            element={
              <SignUp langValue={langValue} setSubmitting={setSubmitting} />
            }
          />
          <Route
            path="/Profiles"
            element={<Profiles langValue={langValue} submitting={submitting} />}
          />
          <Route
            path="/Profile_Submit"
            element={
              <ProfileSubmit
                langValue={langValue}
                setSubmitting={setSubmitting}
              />
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>

      {/* <br></br>
      <br></br>

      <div class="text">
        <br></br>
        <Text text={langValue.greeting} />
        <Text text={langValue.inputprofile} />
        <br></br>
      </div> */}

      {/* <div class="centered-container">
        <IntroForm langValue={langValue} setSubmitting={setSubmitting} />
      </div> */}

      {/* <div class="text">
        <Text text={langValue.profiles} />
      </div>

      <br></br>

      <Profile langValue={langValue} submitting={submitting} />

      <br></br>
      <br></br>
      <br></br> */}
    </>
  );
}

export default App;
