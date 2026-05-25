import { getListById, updateList } from "../api/listApi";
import WordListForm from "../components/WordListForm"
import {Link, useParams} from "react-router-dom"
import { getQuestions } from "../api/questionsApi";
import {useState, useEffect} from "react"


function EditWordList() {

  const { subjectId, listId } = useParams();
  const [existingList, setExistingList] = useState(null);

  useEffect(() => {
   
    async function fetchListData() {
     try {
        const list = await getListById(listId);
        const questions = await getQuestions(listId);
       
        setExistingList({
          title: list.title,
          languageTo: list.target_language,
          questions: questions.data
        });

      } catch (error) {
        console.error(error);
      }
    }

    fetchListData();

  }, [listId]);

  async function handleSubmit(formData) {

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

      console.log(filteredQuestions);
      console.log("Lista uppdaterad!");

      navigate(`/vocabulary/${subjectId}`);

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
        <WordListForm 
        onSubmit={handleSubmit}
        initialData={existingList}
      
        />
        </div>
        
    )
}

export default EditWordList