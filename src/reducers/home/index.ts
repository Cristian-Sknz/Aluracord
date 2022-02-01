import { Reducer, useReducer } from 'react'
import { HomeAction, HomeActionType, HomeReducerState } from './types'

const INITIAL_STATE: HomeReducerState = {
  error: true,
  loading: false,
  username: ''
}

const reducer: Reducer<HomeReducerState, HomeAction> = (state, action) => {
  switch (action.type) {
    case HomeActionType.FAILED_USERNAME: {
      return { 
        ...state, 
        error: true, 
        loading: false 
      }
    }
    case HomeActionType.NEW_USERNAME: {
      return { 
        ...state, 
        error: false, 
        loading: true, 
        username: action.payload.username 
      }
    }
    case HomeActionType.SUCCESS_USERNAME: {
      return { 
        ...state, 
        error: false, 
        loading: false 
      }
    }
    default: {
      return state;
    }
  }
}

export type { HomeReducerState, HomeAction};
export { HomeActionType };

export default function useHomeReducer() {
  return useReducer(reducer, INITIAL_STATE)
}