import { combineReducers } from 'redux'
import authReducer from '../features/Auth/AuthSlice'
import postReducer from '../features/Home/HomeSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer
})
