import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import usersSlice from './usersSlice'
import  offreSlice  from './offreSlice'
import  postSlice  from './postSlice'


export const store = configureStore({
  reducer: {
    user : userSlice,
    users : usersSlice,
    offre: offreSlice,
    post : postSlice,


  },
})