import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../types'

export interface AppState {
  user: IUser | null,
  showSpinner: boolean
}

const initialState: AppState = {
  user: null,
  showSpinner: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setShowSpinner: (state, action) => {
      state.showSpinner = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setShowSpinner } = appSlice.actions

export default appSlice.reducer