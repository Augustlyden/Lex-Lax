import { useEffect, useState } from "react";
import { getAvatars } from "../api/avatarApi";
import { useAppContext } from "../provider/ContextProvider";
import Loading from "../components/UI/Loading";
import "../styles/addUser.css";
import NameStep from "../components/AddUser/NameStep";
import AvatarStep from "../components/AddUser/AvatarStep";
import ConfirmationStep from "../components/AddUser/ConfirmationStep";


function AddUser() {
    
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [avatars, setAvatars] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    
    const [createdUser, setCreatedUser] = useState(null);
    const { createUser, updateUser, deleteUser} = useAppContext();


    useEffect(() => {
        const handleDeleteUser = async () => {
            const confirmDelete = window.confirm("Är du säker på att du vill ta bort den skapade användaren?  Allt på din profil kommer att raderas.");
           
            if (!confirmDelete) {
                return;
         
                await deleteUser(createdUser.id);
                setCreatedUser(null);
                window.alert("Användaren har tagits bort.");
                window.location.href = "/login";
            }
        };

        const fetchAvatars = async () => {
            const avatarData = await getAvatars();
            setAvatars(avatarData || []);
            setLoading(false);
        };

        fetchAvatars();
    }, []); 

    const formatName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const handleNext = () => {
  if (name.trim() === "") {
    setErrorMessage("Du måste fylla i ditt namn.");
    return;
  }

  setErrorMessage("");
  setStep(2);
};

const handleCreateUser = async () => {
  if (selectedAvatar === "") {
    setErrorMessage("Du måste välja en avatar!");
    return;
  }

  setErrorMessage("");

  const formattedName = formatName(name);

  if (createdUser) {
    await updateUser(createdUser.id, formattedName, selectedAvatar);

    setCreatedUser({
      ...createdUser,
      name: formattedName,
      selectedAvatar,
    });
  } else {
    const newUser = await createUser(formattedName, selectedAvatar);

    setCreatedUser(newUser);
  }

  setStep(3);
};
const handleAddAnotherUser = () => {
  setName("");
  setSelectedAvatar("");
  setErrorMessage("");
  setCreatedUser(null);
  setStep(1);
};

if (loading) {
    return <Loading />;
}

return (
    <div className="add-user-container">
        <h1>Skapa en profil</h1>
        {step === 1 && (
            <NameStep name={name} setName={setName} errorMessage={errorMessage} handleNext={handleNext} />  
        )}

     {step === 2 && (
 <AvatarStep
  name={formatName(name)}
  avatars={avatars}
  selectedAvatar={selectedAvatar}
  setSelectedAvatar={setSelectedAvatar}
  errorMessage={errorMessage}
  handleCreateUser={handleCreateUser}
  isEditing={!!createdUser}
/>
      )}

    {step === 3 && (
       <ConfirmationStep
          name={formatName(name)}
          avatars={avatars}
          selectedAvatar={selectedAvatar}
          setStep={setStep}
          handleAddAnotherUser={handleAddAnotherUser}
          handleDeleteUser={handleDeleteUser}
        />
    )}

        </div>
        );
    }

    export default AddUser;