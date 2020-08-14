import React, { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();

const initialState = {
  currentListing: {
    id: null,
    title: "",
    description: "",
    price: null,
    donor: "",
    donor_email: "",
    status: "",
    category: "",
    charity: "",
    charity_url: "",
    charity_score: "",
    charity_score_image: "",
    image: "",
    bids: [],
  },
  buyerDetails: {
    item_id: null,
    bidder_name: "",
    bidder_email: "",
    amount: null,
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    receipt: "",
  },
  listingToPost: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CURRENT_LISTING":
      return {
        ...state,
        currentListing: action.currentListing,
      };
    case "ADD_SELECTED_CHARITY":
      return {
        ...state,
        listingToPost: {
          ...state.listingToPost,
          charity: action.selectedCharity.name,
          charity_url: action.selectedCharity.url,
          charity_score: action.selectedCharity.rating,
          charity_score_image: action.selectedCharity.rating_image,
        },
      };
    case "ADD_BUYER_DETAILS":
      return {
        ...state,
        buyerDetails: { ...state.buyerDetails, ...action.buyerDetails },
      };
    case "ADD_TO_LISTING":
      return {
        ...state,
        listingToPost: { ...state.listingToPost, ...action.listingToPost },
      };
    case "POST_BID":
      return {
        ...state,
        currentBid: action.bid
      };
      case "SET_USER":
      return {
        ...state,
        loginDetails: action.loginDetails,
        userInfo: action.userInfo,
        registrationDetails: action.registration
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
