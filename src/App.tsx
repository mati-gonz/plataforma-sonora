// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import RitualPromptView from "./views/RitualPromptView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/prompt" element={<RitualPromptView />} />
      </Routes>
    </Router>
  );
}

export default App;
