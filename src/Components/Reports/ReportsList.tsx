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

  const calculateTotalAmount = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    reports.forEach(item => {
      if (item && item.type) {
        if (item?.type === 'Income') {
          totalIncome += Number(item.amount);
        } else {
          totalExpense += Number(item.amount);
        }
      }
    });

    return totalIncome - totalExpense;
  };

  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (onLoading) {
    return <Spinner/>;
  }

  const reportsList: JSX.Element[] = sortedReports.map((item) => (
    <ReportItem key={item.id} report={item}/>
  ));

  const totalAmount = calculateTotalAmount();

  return (
    <div className="reports-container">
      <div className="total-amount">
        <p>Total Amount: {totalAmount} KGS</p>
      </div>
      {reportsList}
    </div>
  );
};

export default ReportsList;
