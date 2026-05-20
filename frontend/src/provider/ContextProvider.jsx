import { createContext, useContext, useEffect, useState } from "react";
import { getUsers, getUserById } from "../api/userApi";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const errorHandler = (error) => {
    setLoading(false);
    setError(error?.error || 'Kunde inte ansluta till servern. Kontrollera din internetanslutning eller försök igen senare.');
  }

//   USERS
  const fetchUsers = async () => {
    try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
    } catch (error) {
        errorHandler(error);
    }};

  const fetchUsersById = async (id) => {
    try {
        const data = await getUserById(id);
        setCurrentUser(data);
        setLoading(false);
    } catch (error) {
        errorHandler(error);
    }};
    
    useEffect(() => {
    fetchUsers();
    // TILLFÄLLIGT HÅRDKODAT ID 
    fetchUsersById(1);
    },  []);

  return (
    <Context.Provider value={{ 
        users, 
        currentUser, 
        loading, 
        error 
        }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Context);
};