import React, { useEffect, useReducer, useContext } from 'react';
import reducer from './reducer';

import {
  ADD_ITEM,
  ADD_PERSON,
  SET_ITEM,
  UNSET_ITEM,
  CHANGE_CONTEXT_ITEM_DATA,
  CALCULATE_TOTAL
} from './actions'

const AppContext = React.createContext();

export const initialState = {
  items: [],
  numItems: 0,
  people: [],
  numPeople: 0,
  activeItem: "",
  isActiveItem: false,
  total: 0
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

  const changeContextVal = ({ itemId, name, value }) => {
    const currItems = initialState.items;
    const itemIndex = parseInt(itemId[itemId.length - 1]);
    if (name === "item") currItems[itemIndex].item = value;
    if (name === "price") currItems[itemIndex].price = value;
    dispatch({ type: CHANGE_CONTEXT_ITEM_DATA, payload: { currItems } })
  }

  const calculateTotal = () => {
    let total = 0;
    for (const item of initialState.items) {
      total += parseFloat(item.price);
    }
    total = total.toFixed(2)
    dispatch({ type: CALCULATE_TOTAL, payload: { total } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        addItem,
        addPerson,
        setActiveItem,
        unsetActiveItem,
        changeContextVal,
        calculateTotal
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