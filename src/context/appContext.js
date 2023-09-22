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
  DELETE_PERSON,
  CHANGE_CONTEXT_NAME_DATA,
  RECALCULATE,
  REWRITE_CLIPBOARD_CONTENT,
  CHANGE_TAX,
  CHANGE_TIP,
  CHANGE_SPLIT_METHOD,
  TOGGLE_CONFIRM
} from './actions'

const AppContext = React.createContext();

export const initialState = {
  items: [],
  numItems: 0,
  people: [],
  numPeople: 0,
  yourself: {
    id: "yourself",
    initial: "🖐️",
    name: "Me",
    dues: {}
  },
  activeItem: "",
  isActiveItem: false,
  total: 0,
  tax: 0,
  tip: 0,
  splitMethod: "equal",
  clipboardContent: "",
  isConfirmOpen: false
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
    const itemIndex = currItems.findIndex(el => el.id === itemId)
    // const itemIndex = currItems.indexOf(itemId);
    if (name === "item") currItems[itemIndex].item = value;
    if (name === "price") currItems[itemIndex].price = value;
    dispatch({ type: CHANGE_CONTEXT_ITEM_DATA, payload: currItems })
  }

  const changeNameVal = ({ personId, value, people }) => {
    const currPeople = people;
    const personIndex = currPeople.findIndex(el => el.id === personId)
    currPeople[personIndex].name = value;
    dispatch({ type: CHANGE_CONTEXT_NAME_DATA, payload: currPeople })
  }

  const calculateTotal = (items) => {
    let total = 0;
    for (const item of items) {
      total += parseFloat(item.price);
    }
    total = total.toFixed(2)
    dispatch({ type: CALCULATE_TOTAL, payload: total })
  }

  const addPersonToSplit = (itemIndex, personId, items, people, yourself) => {
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

    if (personId === yourself.id || peopleArray.find(el => el === yourself.id)) {
      yourself.dues[currItems[itemIndex].id] = parseFloat(split)
    }

    dispatch({ type: ADD_PERSON_TO_SPLIT, payload: { currItems, yourself } })
  }

  const removePersonFromSplit = (itemIndex, personId, items, people, yourself) => {
    // const currItems = initialState.items;
    // const itemIndex = parseInt(activeItem[activeItem.length - 1]);
    // const splitArray = currItems[itemIndex].split;
    const currItems = items;

    currItems[itemIndex].split = currItems[itemIndex].split.filter(person =>
      person !== personId);

    const peopleArray = currItems[itemIndex].split
    // console.log(peopleArray)


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


    if (peopleArray.find(el => el === yourself.id)) {
      yourself.dues[currItems[itemIndex].id] = parseFloat(split)
    }

    if (personId === yourself.id) {
      delete yourself.dues[currItems[itemIndex].id];
    }

    dispatch({ type: REMOVE_PERSON_FROM_SPLIT, payload: { currItems, yourself } })
    // for (let i = 0; i < people.length; i++) {
    //   if (peopleArray.includes(people[i].id)) {
    //     console.log(split)
    //     people[i].dues[currItems[itemIndex].id] = parseFloat(split);
    //   }
    // }

  }

  const deleteItem = (id, price, items, people, yourself) => {
    const currItems = items;
    const currPeople = people;
    const filterRemoved = currItems.filter(item => item.id !== id)

    // when item is deleted, also remove the corresponding dues entry for each person in its split array
    const item = items.find(el => el.id === id);
    const split = item.split;
    for (const person of currPeople) {
      if (split.includes(person.id)) {
        delete person.dues[id];
      }
    }

    if (split.includes(yourself.id)) delete yourself.dues[id];

    calculateTotal(filterRemoved)

    // recalculate(id, price, currItems, currPeople)

    dispatch({ type: DELETE_ITEM, payload: { filterRemoved, currPeople, yourself } })
  }

  const deletePerson = (id, items, people, yourself) => {
    const currPeople = people;
    const filterRemoved = currPeople.filter(person => person.id !== id)
    console.log(filterRemoved)

    // find all items the person was a part of and remove the person from the items
    const currItems = items;
    items.map(item => {
      if (item.split.includes(id)) {
        // item.split.filter(el => el.id !== id)
        removePersonFromSplit(items.indexOf(item), id, items, currPeople, yourself)
      }
    })

    // const personItems = items.filter(item => item.split.includes(id));


    dispatch({ type: DELETE_PERSON, payload: { currItems, filterRemoved } })
  }

  // const recalculate = (itemId, items, people) => {
  //   const currItems = items;
  //   const currPeople = people;

  //   const itemIndex = parseInt(itemId[itemId.length - 1]);
  //   const { price, split } = items[itemIndex];
  //   const len = split.length;
  //   const newSplit = price / len;

  //   for (const person of split) {
  //     const itemIndex = parseInt(itemId[itemId.length - 1]);

  //   }

  // recalculate items for all people.
  // get the new item price and rerun calculations for dues. This will require:
  // - going to all the people who belong to the item's split
  // - recalculating the split for each person, using the new price
  // - re-assigning the dues entry of the item ID
  const recalculate = (id, price, items, people, yourself) => {
    const currItems = items;
    const currPeople = people;
    const item = currItems.find(item => item.id === id);
    const split = item.split;

    const floatPrice = parseFloat(price);
    const totalPpl = split.length;
    const newSplit = totalPpl === 0 ? 0 : floatPrice / totalPpl


    currPeople.map(person => {
      if (person.dues.hasOwnProperty(id)) {
        person.dues[id] = newSplit
      }
    });

    if (yourself.dues.hasOwnProperty(id)) {
      yourself.dues[id] = newSplit
    }

    // console.log(currPeople)

    dispatch({ type: RECALCULATE, payload: { currPeople, yourself } })
  }

  const changeTax = (tax) => {
    dispatch({ type: CHANGE_TAX, payload: tax })
  }

  const changeTip = (tip) => {
    dispatch({ type: CHANGE_TIP, payload: tip })
  }

  const changeSplitMethod = (splitMethod) => {
    dispatch({ type: CHANGE_SPLIT_METHOD, payload: splitMethod })
  }

  const pushClipboardContent = (content) => {
    dispatch({ type: REWRITE_CLIPBOARD_CONTENT, payload: content })
  }

  // useEffect(() => {
  //   console.log('hi')
  // }, [initialState.items, initialState.people])

  const toggleConfirm = (open) => {
    dispatch({ type: TOGGLE_CONFIRM, payload: open });
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
        changeNameVal,
        calculateTotal,
        addPersonToSplit,
        removePersonFromSplit,
        deleteItem,
        deletePerson,
        recalculate,
        // rewriteCBContent,
        changeTax,
        changeTip,
        changeSplitMethod,
        pushClipboardContent,
        toggleConfirm
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