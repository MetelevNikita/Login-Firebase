import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// firebase

import { getDocs, collection, query } from "firebase/firestore";
import { dbFirebase } from "../app/firebaseApp";

// types

import { CardType } from "../types/type";

// getUser

export const getUserAsync = createAsyncThunk(
  'name/getUser',
  async () => {

    const querySnapshot = await getDocs(collection(dbFirebase, "users"));
    const data = querySnapshot.docs.map((doc) => {
      return doc
    })


    return data

  }
)



interface User {
  user: CardType[]
}


const initialState: User = {
  user: []
}




const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {},

  extraReducers(builder) {

    builder.addCase(getUserAsync.fulfilled, (state : any, action) => {
      state.user = action.payload

    })

  },
})