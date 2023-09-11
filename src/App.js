import "./App.css";
import Text from "./components/Text";
import Line from "./components/Line";
import Profile from "./components/Profile";
import IntroForm from "./components/IntroForm";
import { langdata } from "./components/Lang_pack";
import { Button } from "@mui/material";
import { useState } from "react";

function App() {
  const [langValue, setLangValue] = useState("");
  // console.log(langdata.Japanese);
  console.log(langValue.greeting);

  return (
    <>
      <div>
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
      </div>

      <div class="text">
        <br></br>
        <Text text={langValue.greeting} />
        <Text text={"Please input your profile!!"} />
        <br></br>
      </div>

      <div class="centered-container">
        <IntroForm />
      </div>

      <br></br>
      <Line />
      <br></br>

      <div class="text">
        <Text text={"Profiles"} />
      </div>

      <br></br>

      <Profile />
    </>
  );
}

export default App;
