import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../provider/ContextProvider";
import "../../styles/buttons.css";


function DeleteUserButton({ user, redirectTo = "/login" }) {
  const navigate = useNavigate();
  const { deleteUser } = useAppContext();

  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      `Är du säker på att du vill ta bort ${user.username}? Allt på profilen kommer att raderas.`
    );

    if (!confirmDelete) return;

    await deleteUser(user.id);

    navigate(redirectTo);
  };

  return (
    <button
      type="button"
      className="flat-btn delete-user-btn"
      onClick={handleDelete}
    >
      <FaTrash />
    </button>
  );
}

export default DeleteUserButton;