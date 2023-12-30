import {createSlice} from '@reduxjs/toolkit';
import {typeOfReport} from '../../types';
import {RootState} from '../../app/store';
import {createReport, deleteReport, fetchReportItem, fetchReports, updateReport} from './TrackerThunks';

interface typesTrackerState {
  reports: typeOfReport[];
  reportOne: typeOfReport;

  fetchReportsLoading: boolean;
  createReportLoading: boolean;
  updateReportLoading: boolean;
  deleteReportLoading: boolean;
}

const initialState: typesTrackerState = {
  reports: [],
  reportOne: {category: '', amount: 0, createdAt: '', type: ''},

  fetchReportsLoading: false,
  createReportLoading: false,
  updateReportLoading: false,
  deleteReportLoading: false,
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

    builder.addCase(createReport.pending, (state: typesTrackerState) => {
      state.createReportLoading = true;
    });
    builder.addCase(createReport.fulfilled, (state: typesTrackerState) => {
      state.createReportLoading = false;
    });
    builder.addCase(createReport.rejected, (state: typesTrackerState) => {
      state.createReportLoading = false;
    });

    builder.addCase(fetchReportItem.pending, (state: typesTrackerState) => {
      state.updateReportLoading = true;
    });
    builder.addCase(fetchReportItem.fulfilled, (state: typesTrackerState, {payload: reportItem}) => {
      state.updateReportLoading = false;
      state.reportOne = reportItem;
    });
    builder.addCase(fetchReportItem.rejected, (state: typesTrackerState) => {
      state.updateReportLoading = false;
    });

    builder.addCase(updateReport.pending, (state: typesTrackerState) => {
      state.updateReportLoading = true;
    });
    builder.addCase(updateReport.fulfilled, (state: typesTrackerState) => {
      state.updateReportLoading = false;
    });
    builder.addCase(updateReport.rejected, (state: typesTrackerState) => {
      state.updateReportLoading = false;
    });

    builder.addCase(deleteReport.pending, (state: typesTrackerState) => {
      state.deleteReportLoading = true;
    });
    builder.addCase(deleteReport.fulfilled, (state: typesTrackerState) => {
      state.deleteReportLoading = false;
    });
    builder.addCase(deleteReport.rejected, (state: typesTrackerState) => {
      state.deleteReportLoading = false;
    });
  }
});

export const trackerReducer = TrackerSlice.reducer;
export const selectReports = (state: RootState) => state.tracker.reports;
export const selectReportItem = (state: RootState) => state.tracker.reportOne;

export const selectFetchReportLoading = (state: RootState) => state.tracker.fetchReportsLoading;
export const selectCreateReportLoading = (state: RootState) => state.tracker.createReportLoading;
export const selectDeleteReportLoading = (state: RootState) => state.tracker.deleteReportLoading;
