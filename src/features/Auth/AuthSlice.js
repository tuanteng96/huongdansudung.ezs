import { createSlice } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

const Auth = createSlice({
  name: 'auth',
  initialState: {
    Token: ''
  },
  reducers: {},
  extraReducers: {}
})

const persistConfig = {
  key: 'auth',
  storage: storage
  //blacklist: ['user']
}

const { reducer, actions } = Auth
export const { setToken } = actions
export default persistReducer(persistConfig, reducer)
