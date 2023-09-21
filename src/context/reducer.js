import { initialState } from './appContext';

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
} from './actions'

const reducer = (state, action) => {
  if (action.type === ADD_ITEM) {
    return {
      ...state,
      items: action.payload,
      numItems: action.payload.length
    }
  }

  if (action.type === ADD_PERSON) {
    return {
      ...state,
      people: action.payload,
      numPeople: action.payload.length
    }
  }

  if (action.type === SET_ITEM) {
    return {
      ...state,
      activeItem: action.payload,
      isActiveItem: true
    }
  }

  if (action.type === UNSET_ITEM) {
    return {
      ...state,
      activeItem: "",
      isActiveItem: false
    }
  }

  if (action.type === CHANGE_CONTEXT_ITEM_DATA) {
    return {
      ...state,
      items: action.payload
    }
  }

  if (action.type === CALCULATE_TOTAL) {
    return {
      ...state,
      total: action.payload
    }
  }

  if (action.type === ADD_PERSON_TO_SPLIT) {
    return {
      ...state,
      items: action.payload
    }
  }

  if (action.type === REMOVE_PERSON_FROM_SPLIT) {
    return {
      ...state,
      items: action.payload
    }
  }

  if (action.type === DELETE_ITEM) {
    return {
      ...state,
      items: action.payload,
      numItems: action.payload.length
    }
  }

  if (action.type === DELETE_PERSON) {
    return {
      ...state,
      people: action.payload,
      numPeople: action.payload.length
    }
  }

  throw new Error(`no such action: ${action.type}`);
}

export default reducer;