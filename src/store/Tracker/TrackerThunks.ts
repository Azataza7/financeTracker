import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {report, responseTypeOfReport, typeOfReport} from '../../types';

export const fetchReports = createAsyncThunk<report[], undefined>(
  'reports',
  async () => {
    const response = await axiosApi.get<responseTypeOfReport | null>('reports.json');
    if (response.data) {
      const result: report[] = Object.keys(response.data).map((id) => ({
        ...response.data[id],
        id: id,
      }));
      return result;
    } else {
      return [];
    }
  }
);

export const createReport = createAsyncThunk<void, typeOfReport>(
  'report/create',
  async (data) => {
    try {
      await axiosApi.post('/reports.json', data);
    } catch (e) {
      console.log('Error: ', e);
    }
  }
);

export const fetchReportItem = createAsyncThunk<typeOfReport, string>(
  'report/reportId',
  async (id) => {
    try {
      const response = await axiosApi.get(`/reports/${id}.json`);
      return response.data;
    } catch (e) {
      console.log('Error: ', e);
    }
  }
);

interface updateReportParams {
  id: string;
  data: typeOfReport;
}


export const updateReport = createAsyncThunk<void, updateReportParams>(
  'report/update',
  async ({id, data}) => {
    try {
      await axiosApi.put(`/reports/${id}.json`, data);
    } catch (e) {
      console.log('Error: ', e);
    }
  }
);

export const deleteReport = createAsyncThunk<void, string>(
  'report/delete',
  async (id) => {
    await axiosApi.delete(`/reports/${id}.json`);
  }
);