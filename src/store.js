import { configureStore } from '@reduxjs/toolkit'
import  PageIDReducer from './features/PageID/PageIDSlice'

export default configureStore({
  reducer: {
      PageID : PageIDReducer,
  },
})