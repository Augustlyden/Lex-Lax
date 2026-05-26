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
    location.pathname === "/login" ||
    location.pathname === "/logga-in";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/logga-in" element={<LoginPage />} />

          <Route path="/add-user" element={<AddUser />} />
          <Route path="/skapa-profil" element={<AddUser />} />
          <Route path="/edit-user/:userId" element={<AddUser />} />

          <Route path="/dashboard/:userId" element={<DashboardPage />} />

          <Route path="/test" element={<QuestionPage />} />
          <Route path="/amne" element={<VocabularyPage />} />

          <Route path="/vocabulary/:subjectId" element={<VocabularyPage />} />
          <Route path="/math/:subjectId" element={<MathPage />} />
          <Route path="/vocabulary/:subjectId/create" element={<CreateWordList />} />
          <Route path="/vocabulary/:subjectId/edit/:listId" element={<EditWordList />} />

          <Route path="/statistik" element={<StatisticPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;