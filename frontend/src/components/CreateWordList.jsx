
import "../styles/createWordList.css"
import { createList } from "../api/listApi";
import { createQuestions } from "../api/questionsApi";
import {Link, useParams} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import WordListForm from "../components/WordListForm"


function CreateWordList({userId}) {
  
  const { subjectId } = useParams();
  const navigate = useNavigate();
 
  async function handleSubmit(formData) {
 
  console.log("handle submit called i createword")
  const filteredQuestions = formData.questions.filter((item) => item.question.trim() !== "" && item.answer.trim() !== "" );

  try {
    const createdList = await createList({title: formData.title, targetLanguage: formData.languageTo, userId: 1, subjectId: 1});
    await createQuestions(createdList.id, filteredQuestions);
    console.log("Allt sparat!");
    console.log(formData);
  } catch (error) {
    console.error(error);
  }
  navigate(`/vocabulary/${subjectId}`);
}

    return (
          <div className="create-word-list-wrapper">
         <div className="">
           <Link to={`/vocabulary/${subjectId}`} className="flat-btn">Tillbaka</Link>
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