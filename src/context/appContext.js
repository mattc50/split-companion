import React, { useEffect, useReducer, useContext } from 'react';
import reducer from './reducer';

import {
  ADD_ITEM,
  ADD_PERSON,
  SET_ITEM,
  UNSET_ITEM
} from './actions'

const AppContext = React.createContext();

export const initialState = {
  items: [],
  numItems: 0,
  people: [],
  numPeople: 0,
  activeItem: "",
  isActiveItem: false
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (item) => {
    const addingItem = initialState.items;
    addingItem.push(item)
    dispatch({ type: ADD_ITEM, payload: addingItem })
  }

  const addPerson = (person) => {
    const addingPerson = initialState.people;
    addingPerson.push(person);
    dispatch({ type: ADD_PERSON, payload: addingPerson })
  }

  const setActiveItem = (item) => {
    dispatch({ type: SET_ITEM, payload: item })
  }

  const unsetActiveItem = (item) => {
    dispatch({ type: UNSET_ITEM })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        addItem,
        addPerson,
        setActiveItem,
        unsetActiveItem
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}

export { AppProvider }