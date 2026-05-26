import { getListById, updateList } from "../api/listApi";
import WordListForm from "../components/WordListForm"
import {Link, useParams} from "react-router-dom"
import { getQuestions, updateQuestions } from "../api/questionsApi";
import {useState, useEffect, use} from "react"

function EditWordList() {

  const { subjectId, listId } = useParams();
  const [existingList, setExistingList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
   
    //HÄMTA WORDLIST FÖR VISNING INUTI FORMULÄRET
    async function fetchListData() {
     try {
      setLoading(true)
        const list = await getListById(listId);
        const questions = await getQuestions(listId);
        console.log(questions);
       
        setExistingList({
          title: list.title,
          languageTo: list.target_language,
          questions: questions
        });

      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false)
      }

    }

    fetchListData();

  }, [listId]);


  //SKICKA UPPDATERAD DATA TILL LISTS & QUESTIONS
  async function handleSubmit(formData) {

    //FILTRERAR BORT TOMMA RUTOR
    const filteredQuestions =
      formData.questions.filter(
        (item) =>
          item.question.trim() !== "" &&
          item.answer.trim() !== ""
      );
    

    try {
      await updateList(listId, {
        title: formData.title,
        targetLanguage: formData.languageTo
      });

     for (const item of filteredQuestions) {
      await updateQuestions(
      item.id,
      item.question,
      item.answer
      );
}
      console.log(filteredQuestions);
      console.log("Lista uppdaterad!");

     // navigate(`/vocabulary/${subjectId}`);

    } catch (error) {
      console.error(error);
    }
  }
   
    return (
      <div className="create-word-list-wrapper">
     
        <div className="">
        <Link to={"/vocabulary/" + subjectId} className="flat-btn">Tillbaka</Link>
      </div>
      <div className = "create-word-list-header-container">
      <h2>Redigera</h2>
      </div>

      {loading ? (
      <p>Hämtar lista...</p>
      ) : (
      <WordListForm 
      onSubmit={handleSubmit}
      initialData={existingList}/>
      )}
      </div>
     )
}

export default EditWordList