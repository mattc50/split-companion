import { initialState } from './appContext';

import {
  ADD_ITEM,
  ADD_PERSON,
  SET_ITEM,
  UNSET_ITEM
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
  throw new Error(`no such action: ${action.type}`);
}

export default reducer;