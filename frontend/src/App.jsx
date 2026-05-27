import "./styles/global.css";
import "./App.css";
import "./styles/buttons.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import QuestionPage from "./pages/QuestionPage";
import DashboardPage from "./pages/DashboardPage";
import VocabularyPage from "./pages/VocabularyPage";
import AddUser from "./pages/AddUser";
import CreateWordList from "./components/CreateWordList";
import EditWordList from "./components/EditWordList";
import MathPage from "./pages/MathPage";
import StatisticPage from "./pages/StatisticPage";


function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/logga-in" ||
    location.pathname === "/skapa-profil" ||
    location.pathname.startsWith("/redigera-profil/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/logga-in" element={<LoginPage />} />

          <Route path="/skapa-profil" element={<AddUser />} />
          <Route path="/redigera-profil/:userId" element={<AddUser />} />

          <Route path="/dashboard/:userId" element={<DashboardPage />} />

          <Route path="/test/:listId" element={<QuestionPage />} />

          <Route path="/sprak/:subjectId" element={<VocabularyPage />} />
          <Route path="/sprak/:subjectId/skapa" element={<CreateWordList />} />
          <Route path="/sprak/:subjectId/redigera/:listId" element={<EditWordList />} />
          <Route path="/matematik/:subjectId" element={<MathPage />} />

          <Route path="/statistik" element={<StatisticPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;