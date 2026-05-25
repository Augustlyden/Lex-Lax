import "../styles/vocabularyPage.css"
import CreateWordList from "../components/CreateWordList"
import WordList from "../components/WordList";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function VocabularyPage() {

const { subjectId } = useParams();
       
return (
  <div className="vocabulary-page-container">
    <WordList
    userId={1}
    subjectId={subjectId}
    />
    
  </div>
);
    
}

export default VocabularyPage