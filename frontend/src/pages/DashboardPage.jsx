import "../styles/dashboardPage.css"
import { useNavigate } from "react-router-dom";
import stars from "../assets/ui/stars.webp";
import Subjects from "../components/Subjects"
import Loading from "../components/UI/Loading"
import { useState, useEffect } from "react";

function DashboardPage() {

  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);


  useEffect(() => {
  async function fetchSubjects() {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3000/api/subjects");
      const data = await response.json();
      if (data.success) {
        setSubjects(data.data);
      }

    } catch (error) {
      console.error("Failed to fetch lists:", error);
    }finally {
      setLoading(false)
    }
  }

  fetchSubjects();
}, []);


if(loading) {
    return <Loading />
}
 
    return (
        <div className="dashboard-page-container">
            <div className ="dashboard-content-wrapper">
            
            <div className = "info-box-wrapper">

                <div className = "image-content-left">
                  <img src={stars} className = "subject-icon" alt="Math icon" />
                </div>

                <div className = "info-content-right">
                <h2>Välkommen till din Dashboard!</h2>
                <p>Här kan du se din studiehistorik, kommande uppgifter och anpassa dina inställningar.</p>
                <div className="progress-bar">
               <div className="progress-fill"></div>
               </div>
            </div>
           </div>

           <div className = "subject-container">
       {subjects.map(subject => (
       <Subjects
       key={subject.id}
       subject={subject}
  />
))}
</div>
                         </div>
                               </div>

           
                
    )

}
export default DashboardPage;