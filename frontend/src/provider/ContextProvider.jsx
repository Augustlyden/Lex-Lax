import { createContext, useContext, useEffect, useState } from "react";
import { getUsers, getUserById, createApiUser, updateApiUser, deleteApiUser } from "../api/userApi";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const errorHandler = (err) => {
    setLoading(false);
    if (!err) {
      setError(null);
    } else {
      setError(err?.error || 'Kunde inte ansluta till servern. Kontrollera din internetanslutning eller försök igen senare.');
    }
  };

  //   USERS
  // const fetchUsers = async () => {
  //   errorHandler(null);
  //   setLoading(true);
  //   try {
  //     const data = await getUsers();
  //     setUsers(data);
  //     setLoading(false);
  //   } catch (error) {
  //     errorHandler(error);
  //   }
  // };
    useEffect(() => {
    (async () => {
      errorHandler(null);
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    })();
  }, []);

  const fetchUsersById = async (id) => {
    errorHandler(null);
    setLoading(true);
    try {
      const data = await getUserById(id);
      setCurrentUser(data);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const createUser = async (username, profileImg) => {
    errorHandler(null);
    setLoading(true);
    try {
      const data = await createApiUser(username, profileImg);
      setCurrentUser(data);
      setUsers((prevUsers) => [...prevUsers, data]);
      console.log('Användare skapad:', data);
      setLoading(false);
      return data;
    } catch (error) {
      errorHandler(error);
    }
  };

const updateUser = async (id, username, profileImg) => {
  errorHandler(null);
  setLoading(true);

  try {
    const data = await updateApiUser(id, username, profileImg);

    setCurrentUser(data);

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        String(user.id) === String(id) ? data : user
      )
    );

    setLoading(false);
    return data;
  } catch (error) {
    errorHandler(error);
  }
};

  const deleteUser = async (id) => {
    errorHandler(null);
    setLoading(true);
    try {
      await deleteApiUser(id);
    if (String(currentUser?.id) === String(id)) {
  setCurrentUser(null);
}
      setUsers((prevUsers) => prevUsers.filter(user => String(user.id) !== String(id)));
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };


  return (
    <Context.Provider value={{
      users,
      currentUser,
      loading,
      error,
      createUser,
      setCurrentUser,
      updateUser,
      deleteUser,
      fetchUsersById
    }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Context);
};