import React, { useEffect, useReducer, useContext } from 'react';
import reducer from './reducer';

import {
  ADD_ITEM,
  ADD_PERSON,
  SET_ITEM,
  UNSET_ITEM,
  CHANGE_CONTEXT_ITEM_DATA,
  CALCULATE_TOTAL,
  ADD_PERSON_TO_SPLIT,
  REMOVE_PERSON_FROM_SPLIT,
  DELETE_ITEM,
  DELETE_PERSON
} from './actions'

const AppContext = React.createContext();

export const initialState = {
  items: [],
  numItems: 0,
  people: [],
  numPeople: 0,
  activeItem: "",
  isActiveItem: false,
  total: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (item, items) => {
    const addingItem = items;
    addingItem.push(item)
    dispatch({ type: ADD_ITEM, payload: addingItem })
  }

  const addPerson = (person, people) => {
    const addingPerson = people;
    addingPerson.push(person);
    dispatch({ type: ADD_PERSON, payload: addingPerson })
  }

  const setActiveItem = (item) => {
    dispatch({ type: SET_ITEM, payload: item })
  }

  const unsetActiveItem = (item) => {
    dispatch({ type: UNSET_ITEM })
  }

  const changeContextVal = ({ itemId, name, value, items }) => {
    const currItems = items;
    const itemIndex = parseInt(itemId[itemId.length - 1]);
    // const itemIndex = currItems.indexOf(itemId);
    if (name === "item") currItems[itemIndex].item = value;
    if (name === "price") currItems[itemIndex].price = value;
    dispatch({ type: CHANGE_CONTEXT_ITEM_DATA, payload: currItems })
  }

  const calculateTotal = (items) => {
    let total = 0;
    for (const item of items) {
      total += parseFloat(item.price);
    }
    total = total.toFixed(2)
    dispatch({ type: CALCULATE_TOTAL, payload: total })
  }

  const addPersonToSplit = (itemIndex, personId, items, people) => {
    const currItems = items;
    const peopleArray = currItems[itemIndex].split;
    peopleArray.push(personId)

    const price = parseFloat(currItems[itemIndex].price);
    const totalPpl = peopleArray.length;
    const split = (price / totalPpl).toFixed(2);

    for (let i = 0; i < people.length; i++) {
      if (peopleArray.includes(people[i].id)) {
        people[i].dues[currItems[itemIndex].id] = parseFloat(split);
      }
    }

    dispatch({ type: ADD_PERSON_TO_SPLIT, payload: currItems })
  }

  const removePersonFromSplit = (itemIndex, personId, items, people) => {
    // const currItems = initialState.items;
    // const itemIndex = parseInt(activeItem[activeItem.length - 1]);
    // const splitArray = currItems[itemIndex].split;
    const currItems = items;

    currItems[itemIndex].split = currItems[itemIndex].split.filter(person =>
      person !== personId);

    const peopleArray = currItems[itemIndex].split
    // console.log(peopleArray)

    dispatch({ type: REMOVE_PERSON_FROM_SPLIT, payload: currItems })

    const price = parseFloat(currItems[itemIndex].price);
    const totalPpl = peopleArray.length;
    const split = totalPpl === 0 ? 0 : price / totalPpl

    for (const person of people) {
      if (personId == person.id) {
        // console.log(person.id)
        // console.log(currItems[itemIndex].id)
        delete person.dues[currItems[itemIndex].id]
      }
      if (peopleArray.includes(person.id)) {
        // console.log(split)
        person.dues[currItems[itemIndex].id] = parseFloat(split);
      }
    }

    // for (let i = 0; i < people.length; i++) {
    //   if (peopleArray.includes(people[i].id)) {
    //     console.log(split)
    //     people[i].dues[currItems[itemIndex].id] = parseFloat(split);
    //   }
    // }

  }

  const deleteItem = (id, items) => {
    const currItems = items;
    const filterRemoved = currItems.filter(item => item.id !== id)
    dispatch({ type: DELETE_ITEM, payload: filterRemoved })
  }

  const deletePerson = (id, people) => {
    const currPeople = people;
    const filterRemoved = currPeople.filter(person => person.id !== id)
    dispatch({ type: DELETE_PERSON, payload: filterRemoved })
  }

  // useEffect(() => {
  //   console.log('hi')
  // }, [initialState.items, initialState.people])

  return (
    <AppContext.Provider
      value={{
        ...state,
        addItem,
        addPerson,
        setActiveItem,
        unsetActiveItem,
        changeContextVal,
        calculateTotal,
        addPersonToSplit,
        removePersonFromSplit,
        deleteItem,
        deletePerson
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