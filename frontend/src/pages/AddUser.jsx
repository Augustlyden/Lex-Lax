import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getAvatars } from "../api/avatarApi";
import { useAppContext } from "../hooks/useAppContext";

import Loading from "../components/UI/Loading";
import NameStep from "../components/AddUser/NameStep";
import AvatarStep from "../components/AddUser/AvatarStep";
import ConfirmationStep from "../components/AddUser/ConfirmationStep";

import "../styles/addUser.css";
import { FaArrowLeft } from "react-icons/fa";

function AddUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    users,
    createUser,
    updateUser,
    deleteUser,
  } = useAppContext();

  const handleBack = () => {
  if (step === 2) {
    setStep(step - 1);
  } else {
    navigate("/logga-in");
  }
};

 const existingUser = users.find(
  (user) => String(user.id) === String(userId)
);

  const isEditMode = Boolean(userId);

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");

  const [selectedAvatar, setSelectedAvatar] =
    useState(null);

  const [avatars, setAvatars] = useState([]);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [loading, setLoading] = useState(true);

  const [createdUser, setCreatedUser] =
    useState(null);

  useEffect(() => {
    const fetchAvatars = async () => {
      const avatarData = await getAvatars();

      setAvatars(avatarData || []);
      setLoading(false);
    };

    fetchAvatars();
  }, []);

  useEffect(() => {
    if (existingUser) {
      setName(existingUser.username || "");
      setSelectedAvatar(
        existingUser.profile_img || null
      );
      setCreatedUser(existingUser);
      setStep(1);
    }
  }, [existingUser]);

  const formatName = (name) => {
    return (
      name.charAt(0).toUpperCase() +
      name.slice(1).toLowerCase()
    );
  };

  const handleNext = () => {
    if (name.trim() === "") {
      setErrorMessage(
        "Du måste fylla i ditt namn."
      );
      return;
    }

    setErrorMessage("");
    setStep(2);
  };

  const handleCreateUser = async () => {
    if (!selectedAvatar) {
      setErrorMessage(
        "Du måste välja en avatar!"
      );
      return;
    }

    setErrorMessage("");

    const formattedName = formatName(name);

    if (isEditMode) {
      await updateUser(
        userId,
        formattedName,
        selectedAvatar
      );

      setCreatedUser({
        id: userId,
        username: formattedName,
        profile_img: selectedAvatar,
      });
    } else {
      const newUser = await createUser(
        formattedName,
        selectedAvatar
      );

      setCreatedUser(
        newUser || {
          id: Date.now(),
          username: formattedName,
          profile_img: selectedAvatar,
        }
      );
    }

    setStep(3);
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Är du säker på att du vill ta bort användaren? Allt på profilen kommer att raderas."
    );

    if (!confirmDelete) return;

    await deleteUser(createdUser.id);

    setCreatedUser(null);

    window.alert(
      "Användaren har tagits bort."
    );

    navigate("/logga-in");
  };

  const handleAddAnotherUser = () => {
    setName("");
    setSelectedAvatar(null);
    setErrorMessage("");
    setCreatedUser(null);
    setStep(1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="add-user-container">
      <button
  type="button"
  className="flat-btn back-btn"
  onClick={handleBack}
>
  <FaArrowLeft /> {step === 2 ? "Tillbaka" : "Till inloggning"}
</button>
      <h1>
        {isEditMode
          ? "Redigera profil"
          : "Skapa en profil"}
      </h1>

      {step === 1 && (
        <NameStep
          name={name}
          setName={setName}
          errorMessage={errorMessage}
          handleNext={handleNext}
        />
      )}

      {step === 2 && (
        <AvatarStep
          name={formatName(name)}
          avatars={avatars}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={
            setSelectedAvatar
          }
          errorMessage={errorMessage}
          handleCreateUser={
            handleCreateUser
          }
          isEditing={isEditMode}
        />
      )}

      {step === 3 && (
        <ConfirmationStep
          name={formatName(name)}
          avatars={avatars}
          selectedAvatar={selectedAvatar}
          createdUser={createdUser}
          setStep={setStep}
          handleAddAnotherUser={
            handleAddAnotherUser
          }
          handleDeleteUser={
            handleDeleteUser
          }
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
}

export default AddUser;