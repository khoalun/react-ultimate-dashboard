import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../types'

export interface AppState {
  user: IUser | null
}

const initialState: AppState = {
  user: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = appSlice.actions

export default appSlice.reducer