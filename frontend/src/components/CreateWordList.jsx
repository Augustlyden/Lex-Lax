import "../styles/createWordList.css"
import { createList } from "../api/listApi";
import { createQuestions } from "../api/questionsApi";
import {Link, useParams} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import WordListForm from "../components/WordListForm"
import { useAppContext } from "../hooks/useAppContext";



function CreateWordList() {

  const { currentUser } = useAppContext();
  
  const { subjectId } = useParams();

  const navigate = useNavigate();
 
  async function handleSubmit(formData) {
  console.log("handleSubmit called i CreateWordList.jsx")
  
  //FILTERAR BORT TOMMA RADER
  const filteredQuestions = 
  formData.questions.filter((item) => item.question.trim() !== "" && item.answer.trim() !== "" );

  try {
    
    const createdList = 
    await createList({title: formData.title, targetLanguage: formData.languageTo, userId: currentUser.id, subjectId: subjectId});
    
    //SKAPA QUESTIONS TILL DATABASEN MED OVAN LIST.ID + DE FILTERADE FRÅGORNA
    await createQuestions(createdList.id, filteredQuestions);
    
    console.log("Allt sparat!");
    console.log(formData);
  } catch (error) {
    console.error(error);
  }
  navigate(`/sprak/${subjectId}`);
}

    return (
      <div className="create-word-list-wrapper">
        <div className="">
          <Link to={`/sprak/${subjectId}`} className="flat-btn">Tillbaka</Link>
      </div>
        <div className = "create-word-list-header-container">
        <h2>Skriv in veckans glosor!</h2>
      </div>
      <WordListForm 
      onSubmit={handleSubmit}
      />
    </div>
  )
}
  export default CreateWordList;