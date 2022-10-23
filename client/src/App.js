import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ChatPage } from "./pages/Chat/Chat";
import { SetAvatar } from "./pages/SetAvatar/SetAvatar";
// import { ErrorPage } from "./pages/ErrorPage/Errorpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/" element={<ChatPage />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
