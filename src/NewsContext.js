import React, { createContext, useContext, useReducer } from 'react';

export const NewsContext = createContext();

const initialState = {
  news: [],
  searchTerm: '',
};

export const ACTIONS = {
  SET_NEWS: 'SET_NEWS',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_NEWS:
      return { ...state, news: action.payload };
    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

export const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => useContext(NewsContext);
