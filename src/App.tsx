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
