import {createSlice} from '@reduxjs/toolkit';
import {typeOfReport} from '../../types';
import {RootState} from '../../app/store';
import {fetchReports} from './TrackerThunks';

interface typesTrackerState {
  reports: typeOfReport[];
  reportOne: typeOfReport | null;

  fetchReportsLoading: boolean;
}

const initialState: typesTrackerState = {
  reports: [],
  reportOne: null,

  fetchReportsLoading: false,
};

const TrackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    setResult: (state: typesTrackerState, {payload: reports}) => {
      state.reports = reports;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReports.pending, (state: typesTrackerState) => {
      state.fetchReportsLoading = true;
    });
    builder.addCase(fetchReports.fulfilled, (state: typesTrackerState, {payload: reports}) => {
      state.reports = reports;
      state.fetchReportsLoading = false;
    });
    builder.addCase(fetchReports.rejected, (state: typesTrackerState) => {
      state.fetchReportsLoading = false;
    });
  }
});

export const trackerReducer = TrackerSlice.reducer;
export const selectReports = (state: RootState) => state.tracker.reports;

export const selectFetchReportLoading = (state: RootState) => state.tracker.fetchReportsLoading;
