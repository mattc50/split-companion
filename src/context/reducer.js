import { initialState } from './appContext';

import {
  ADD_ITEM,
  ADD_PERSON,
  SET_ITEM,
  UNSET_ITEM,
  CHANGE_CONTEXT_ITEM_DATA,
  CHANGE_CONTEXT_NAME_DATA,
  CALCULATE_TOTAL,
  ADD_PERSON_TO_SPLIT,
  REMOVE_PERSON_FROM_SPLIT,
  DELETE_ITEM,
  DELETE_PERSON,
  RECALCULATE,
  REWRITE_CLIPBOARD_CONTENT,
  CHANGE_TAX,
  CHANGE_TIP,
  CHANGE_SPLIT_METHOD,
  TOGGLE_CONFIRM
} from './actions'

const reducer = (state, action) => {
  if (action.type === ADD_ITEM) {
    return {
      ...state,
      items: action.payload,
      numItems: action.payload.length,
      revItems: action.payload.toReversed()
    }
  }

  if (action.type === ADD_PERSON) {
    return {
      ...state,
      people: action.payload,
      numPeople: action.payload.length,
      revPeople: action.payload.toReversed()
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

  if (action.type === CHANGE_CONTEXT_NAME_DATA) {
    return {
      ...state,
      people: action.payload
    }
  }

  if (action.type === CALCULATE_TOTAL) {
    return {
      ...state,
      total: action.payload
    }
  }

  if (action.type === ADD_PERSON_TO_SPLIT) {
    // if (action.payload.yourself) {
    return {
      ...state,
      items: action.payload.currItems,
      yourself: action.payload.yourself
    }
    // } else {
    //   return {
    //     ...state,
    //     items: action.payload.currItems,
    //   }
    // }
  }

  if (action.type === REMOVE_PERSON_FROM_SPLIT) {
    // if (action.payload.yourself) {
    return {
      ...state,
      items: action.payload.currItems,
      yourself: action.payload.yourself
    }
    // } else {
    //   return {
    //     ...state,
    //     items: action.payload.currItems,
    //   }
    // }
  }

  if (action.type === DELETE_ITEM) {
    return {
      ...state,
      items: action.payload.filterRemoved,
      numItems: action.payload.filterRemoved.length,
      people: action.payload.currPeople,
      yourself: action.payload.yourself,
      revItems: action.payload.filterRemoved.toReversed()
    }
  }

  if (action.type === DELETE_PERSON) {
    return {
      ...state,
      people: action.payload.filterRemoved,
      numPeople: action.payload.filterRemoved.length,
      items: action.payload.currItems,
      revPeople: action.payload.filterRemoved.toReversed()
    }
  }

  if (action.type === RECALCULATE) {
    return {
      ...state,
      people: action.payload.currPeople,
      yourself: action.payload.yourself
    }
  }

  if (action.type === REWRITE_CLIPBOARD_CONTENT) {
    return {
      ...state,
      clipboardContent: action.payload
    }
  }

  if (action.type === CHANGE_TAX) {
    return {
      ...state,
      tax: action.payload
    }
  }

  if (action.type === CHANGE_TIP) {
    return {
      ...state,
      tip: action.payload
    }
  }

  if (action.type === CHANGE_SPLIT_METHOD) {
    return {
      ...state,
      splitMethod: action.payload
    }
  }

  if (action.type === TOGGLE_CONFIRM) {
    return {
      ...state,
      isConfirmOpen: action.payload
    }
  }

  throw new Error(`no such action: ${action.type}`);
}

export default reducer;