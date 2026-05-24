import { getCurrentWeek } from "../utils/getCurrentWeek";
import {useState} from "react"
import "../styles/createWordList.css"
import { createList } from "../api/listApi";
import { createQuestions } from "../api/questionsApi";
import {Link} from "react-router-dom"

function CreateWordList({userId, subjectId}) {
 
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [languageTo, setLanguageTo] = useState("Engelska");
  const [title, setTitle] = useState( `${languageTo} - ${getCurrentWeek()}`);
   
  function addWord() {
  setQuestions([ ...questions, { question: "", answer: "" } 
  ]);
  }
  function handleWordChange(index, field, value) {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  }
  function handleTranslateTo(e) {
      const selectedLanguage = e.target.value;
      setLanguageTo(selectedLanguage);
      setTitle(
      `${selectedLanguage} - ${getCurrentWeek()}`
    );
    console.log("Language changed to:", e.target.value)
  }
  function handleTitle(e) {
      setTitle(e.target.value);
      console.log("Title:", e.target.value)
  }

async function handleSubmit(e) {
  e.preventDefault();

  const filteredQuestions = questions.filter(
    (item) =>
      item.question.trim() !== "" &&
      item.answer.trim() !== ""
  );

  try {
    const createdList = await createList({title: title, targetLanguage: languageTo, userId: 1, subjectId: 1});
    await createQuestions(createdList.id, filteredQuestions);
    console.log("Allt sparat!");
  } catch (error) {
    console.error(error);
  }
}

    return (
          <div className="word-list-wrapper">
         <div className="">
           <Link to={"/Dashboard"} className="flat-btn">Tillbaka</Link>
          </div>
        <div className = "create-word-list-header-container">
        <h2>Skriv in veckans glosor!</h2>
</div>
        <form onSubmit={handleSubmit}>
        <div className="create-word-list-container">

        <h2>Titel</h2>
              <input
                type="text"
                value={title}
                onChange = {handleTitle}
                className="word-input"
              />

              <div className = "word-from-to-card">
              
                <div className="translation-box">
                <p className="text1">Språk från:</p>
              <select  
              className="word-input"
              value={languageTo}
              onChange={handleTranslateTo}>
              <option value="Engelska">Engelska</option>
              <option value="Spanska">Spanska</option>
              <option value="Franska">Franska</option>
              </select>
              </div>
              
              <span className="arrow"></span>

              <div className="translation-box">
              <p className="text1">Språk till:</p>
              <select className="word-input" disabled>
              <option value="Svenska">Svenska</option>
              </select>
              </div>
          </div>
      <div className = "word-list-scroll-container">

    {/* Map function to display word/translated dynamically*/} 
      {questions.map((item, index) => (
    <div className="create-word-list-card" key={index}>

      <div className="word-left">
        <input
          type="text"
          placeholder="Ord"
          className="word-input"
          onChange={(e) => handleWordChange(index, "question", e.target.value)}
          value={item.question}
        />
      </div>

      <span className="arrow">→</span>

      <div className="word-right">
        <input
          type="text"
          placeholder="Översättning"
          className="word-input"
          onChange={(e) => handleWordChange(index, "answer", e.target.value)}
          value={item.answer}
        />
      </div>
    </div>
  ))}
  </div>

        <button type="button" className="secondary-btn margin-button" onClick = {addWord}>
          + Lägg till ord
      </button>
       
       <button 
        type = "submit"
        className="primary-btn">
            Spara glosor
      </button>
        </div>
        </form>
        </div>
      )
  }
  export default CreateWordList;