/** @jsxImportSource @emotion/react */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main";
import { css } from "@emotion/react";
import theme from "./styles/theme";
import { SideNav } from "./components/Layouts/SideNav";
import { Editor } from "./components/Editor/Editor";

function App() {
  return (
    <div
      css={css`
        body {
          background-color: ${theme.islandBlueTheme.bodyBackground};
        }
      `}
    >
      <SideNav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="manage">{/*  user chat */}</Route>
          <Route path="posting" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
