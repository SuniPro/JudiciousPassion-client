/** @jsxImportSource @emotion/react */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainFrame } from "./pages/MainFrame";
import { css } from "@emotion/react";
import theme from "./styles/theme";
import { Taste } from "./pages/Taste";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Personal } from "./pages/Personal";
import { Toaster } from "react-hot-toast";
import { EditorMainFrame } from "./pages/EditorMainFrame";
import { UserContextProvider } from "./context/UserContext";
import { SignForm } from "./components/Sign/Sign";
import { Tour } from "./pages/Tour";
import { WindowContextProvider } from "./context/WindowContext";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <WindowContextProvider>
          <div
            css={css`
              body {
                background-color: ${theme.islandBlueTheme.bodyBackground};
              }
              width: ${width}px;

              display: flex;
              flex-direction: column;
              align-items: center;
              overflow-x: hidden;

              // 이상하게 div 우측에 html에 요소에 잡히지 않는 빈공간이 생김.
              // 임의로 조정하기 위해 아래의 transform 을 추가하였으며, 추후 index.html 수정으로 이를 수정하는게 좋을 것 같음.
              transform: translateX(-1px);
            `}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainFrame />}>
                  <Route path="taste" element={<Taste />} />
                  <Route path="personal" element={<Personal />} />
                  <Route path="sign" element={<SignForm />} />
                  <Route path="tour" element={<Tour />} />
                </Route>
                <Route path="manage">{/*  user chat */}</Route>
                <Route path="posting" element={<EditorMainFrame />}></Route>
              </Routes>
              <Toaster />
            </BrowserRouter>
          </div>
        </WindowContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
