import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchReportLoading, selectReports} from '../../store/Tracker/TrackerSlice';
import {fetchReports} from '../../store/Tracker/TrackerThunks';
import Spinner from '../Spinner/Spinner';
import ReportItem from './ReportItem';
import './report.css';
import {report} from '../../types';

const ReportsList = () => {
  const dispatch = useAppDispatch();
  const reports: report[] = useAppSelector(selectReports);
  const onLoading: boolean = useAppSelector(selectFetchReportLoading);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (onLoading) {
    return <Spinner/>;
  }

  const reportsList: JSX.Element[] = sortedReports.map((item) => (
    <ReportItem key={item.id} report={item}/>
  ));

  return (
    <div className="reports-container">
      {reportsList}
    </div>
  );
};

export default ReportsList;