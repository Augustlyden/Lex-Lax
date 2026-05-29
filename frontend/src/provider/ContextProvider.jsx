import { createContext, useEffect, useState } from "react";
import { getUsers, getUserById, createApiUser, updateApiUser, deleteApiUser } from "../api/userApi";

// Create the global context instance to be shared across components
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  // --- Global State ---
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
  const savedUser = localStorage.getItem("currentUser");
  return savedUser ? JSON.parse(savedUser) : null;
});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Centralized Error Handling ---
  // Formats and applies error messages to the state, with a fallback for network issues
  const errorHandler = (err) => {
    setLoading(false);
    if (!err) {
      setError(null);
    } else {
      setError(err?.error || 'Kunde inte ansluta till servern. Kontrollera din internetanslutning eller försök igen senare.');
    }
  };

  // --- API Actions ---

  // Automatically fetch all users from the database on initial mount
  useEffect(() => {
    // Uses an Immediately Invoked Function Expression (IIFE) because useEffect callbacks cannot be async
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

  // Fetch a specific user profile by ID and set it as the active currentUser
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

  // Create a new user profile, select it, and append it to the global users list
const createUser = async (username, profileImg) => {
  errorHandler(null);
  setLoading(true);

  try {
    const data = await createApiUser(username, profileImg);

    const refreshedUsers = await getUsers();
    setUsers(refreshedUsers);  // Append the newly created user to local state

    const createdUserWithImage = refreshedUsers.find(
      (user) => String(user.id) === String(data.id)
    );

    setCurrentUser(createdUserWithImage || data);

    setLoading(false);
    return createdUserWithImage || data;
  } catch (error) {
    errorHandler(error);
  }
};

  // Update user credentials and sync changes across both the currentUser and the users collection
const updateUser = async (id, username, profileImg) => {
  errorHandler(null);
  setLoading(true);

  try {
    const data = await updateApiUser(id, username, profileImg);

    const refreshedUsers = await getUsers();
    setUsers(refreshedUsers);

    const updatedUserWithImage = refreshedUsers.find(
      (user) => String(user.id) === String(id)
    );

    setCurrentUser(updatedUserWithImage || data);

    setLoading(false);
    return updatedUserWithImage || data;
  } catch (error) {
    errorHandler(error);
  }
};


  // Remove a user from the database and clean up local component
  const deleteUser = async (id) => {
    errorHandler(null);
    setLoading(true);
    try {
      await deleteApiUser(id);
      
      // If the deleted user happens to be the currently active profile, deselect it
      if (String(currentUser?.id) === String(id)) {
        setCurrentUser(null);
      }
      
      // Filter out the deleted user profile from the global list
      setUsers((prevUsers) => prevUsers.filter(user => String(user.id) !== String(id)));
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
  if (currentUser) {
    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );
  } else {
    localStorage.removeItem("currentUser");
  }
}, [currentUser]);

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

export default ContextProvider;