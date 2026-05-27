// src/hooks/useAppContext.js
import { useContext } from "react";
import { Context } from "../provider/ContextProvider";

export const useAppContext = () => {
  const context = useContext(Context);
  
  if (!context) {
    throw new Error("useAppContext måste användas inuti en ContextProvider");
  }
  
  return context;
};