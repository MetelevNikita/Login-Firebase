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
      return doc.data()
    })


    return data

  }
)



interface User {
  users: CardType[]
}


const initialState: User = {
  users: []
}




const userSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {},

  extraReducers(builder) {

    builder.addCase(getUserAsync.fulfilled, (state: CardType[] | any, action) => {
      state.users = action.payload

    })

  },
})


export default userSlice.reducer