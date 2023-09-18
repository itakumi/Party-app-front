import "./App.css";
import Text from "./components/Text";
import Line from "./components/Line";
import Profile from "./components/Profile";
import IntroForm from "./components/IntroForm";
import { langdata } from "./components/Lang_pack";
import { MenuItem, InputLabel, FormControl, Select, Box } from "@mui/material";
import { useState } from "react";

function App() {
  const [langValue, setLangValue] = useState(langdata.English);
  // console.log(langdata.Japanese);
  console.log(langValue.greeting);
  console.log(langValue);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLangValue(langdata[selectedLanguage]);
  };

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

      <br></br>
      <br></br>

      <div class="text">
        <br></br>
        <Text text={langValue.greeting} />
        <Text text={langValue.inputprofile} />
        <br></br>
      </div>

      <div class="centered-container">
        <IntroForm langValue={langValue} />
      </div>

      <br></br>
      <Line />
      <br></br>

      <div class="text">
        <Text text={langValue.profiles} />
      </div>

      <br></br>

      <Profile langValue={langValue} />

      <br></br>
      <br></br>
      <br></br>
    </>
  );
}

export default App;

{
  /* <div>
        <Button size="small" onClick={() => setLangValue(langdata.Japanese)}>
          日本語
        </Button>
        <Button size="small" onClick={() => setLangValue(langdata.English)}>
          English
        </Button>
        <Button size="small" onClick={() => setLangValue(langdata.Chinese)}>
          中文
        </Button>
        <Button size="small" onClick={() => setLangValue(langdata.Hindi)}>
          हिन्दी
        </Button>
      </div> */
}
