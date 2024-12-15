/** @jsxImportSource @emotion/react */
import "./App.css";
import { Taste } from "./pages/Taste";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main";
import { css } from "@emotion/react";
import theme from "./styles/theme";

function App() {
  return (
    <div
      css={css`
        body {
          background-color: ${theme.islandBlueTheme.bodyBackground};
        }
      `}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="taste" element={<Taste />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Taste></Taste>
    </div>
  );
}

export default App;
