import { getCurrentWeek } from "../utils/getCurrentWeek";
import {useState} from "react"

function CreateWordList() {
 
    const [words, setWords] = useState([
       { word: "", translation: "" }
       ]);
    const [languageTo, setLanguageTo] = useState("Engelska");
    const [title, setTitle] = useState( `${languageTo} - ${getCurrentWeek()}`);
   
function addWord() {
  setWords([ ...words, { word: "", translation: "" } 
]);
}
function handleWordChange(index, field, value) {
  const updatedWords = [...words];
  updatedWords[index][field] = value;
  setWords(updatedWords);
}
function handleTranslateTo(e) {
     const selectedLanguage = e.target.value;
    setLanguageTo(selectedLanguage);
    setTitle(
    `${selectedLanguage} - ${getCurrentWeek()}`
  );
}
function handleTitle(e) {
    setTitle(e.target.value);
    console.log("Title:", e.target.value)
}
function handleSubmit() {}

  return (
        <div className="word-list-wrapper">
      <h1>Skriv in veckans glosor!</h1>

      
      <form onSubmit={handleSubmit}>
      <div className="word-list-container">

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
    {words.map((item, index) => (
  <div className="word-list-card" key={index}>

    <div className="word-left">
      <input
        type="text"
        placeholder="Ord"
        className="word-input"
        onChange={(e) => handleWordChange(index, "word", e.target.value)}
        value={item.word}
      />
    </div>

    <span className="arrow">→</span>

    <div className="word-right">
      <input
        type="text"
        placeholder="Översättning"
        className="word-input"
        onChange={(e) => handleWordChange(index, "translation", e.target.value)}
        value={item.translation}
      />
    </div>
  </div>
))}
</div>

<button type="button" className="primary-button wordlist-btn" onClick = {addWord}>
  + Lägg till ord
</button>
      <button 
      type = "submit"
       className="primary-button wordlist-btn-save">
          Spara glosor
          </button>
       </div>
      </form>
      </div>
    )
}
export default CreateWordList;