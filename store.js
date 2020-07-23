import React, { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();

const initialState = {
  currentListing: {
    id: 0,
    title: "",
    description: "",
    price: 0,
    donor: "",
    status: "",
    category: "",
    charity: "",
    image: "",
    bids: []
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CURRENT_LISTING":
      return {
        ...state,
        currentListing: action.currentListing,
      };
    
      default:
      throw new Error(`Unhandled action type: ${action.type}`);
    
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);