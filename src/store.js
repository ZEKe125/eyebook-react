import { configureStore } from '@reduxjs/toolkit'
import  PageIDReducer from './features/PageID/PageIDSlice'
import ChooseBookReducer from './features/ChooseBook/ChooseBookSlice'

export default configureStore({
  reducer: {
      PageID : PageIDReducer,
      ChooseBook : ChooseBookReducer,

  },
})