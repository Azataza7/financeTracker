import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchReportLoading, selectReports} from '../../store/Tracker/TrackerSlice';
import {fetchReports} from '../../store/Tracker/TrackerThunks';
import Spinner from '../Spinner/Spinner';
import {report} from '../../types';
import ReportItem from './ReportItem';
import './report.css';

const ReportsList = () => {
  const dispatch = useAppDispatch();
  const reports = useAppSelector(selectReports);
  const onLoading = useAppSelector(selectFetchReportLoading);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  if (onLoading) {
    return <Spinner/>;
  }

  const reportsList: report[] | null = reports.map((item) => (
    <ReportItem key={item.id} report={item}/>
  ));

  return (
    <div className="reports-container">
      {reportsList}
    </div>
  );
};

export default ReportsList;