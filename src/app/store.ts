import {configureStore} from '@reduxjs/toolkit';
import {categoryReducer} from '../store/Category/CategorySlice';
import {trackerReducer} from '../store/Tracker/TrackerSlice';


export const store = configureStore({
  reducer: {
    category: categoryReducer,
    tracker: trackerReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;