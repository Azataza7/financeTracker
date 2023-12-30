import React, {useEffect} from 'react';
import {report, typesCategory} from '../../types';
import {fetchCategoryItem} from '../../store/Category/CategoryThunks';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategoryItem} from '../../store/Category/CategorySlice';

interface Props {
  report: report
}

const ReportItem: React.FC<Props> = ({report}) => {
  const categoryItem: typesCategory = useAppSelector(selectCategoryItem);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchCategoryItem(report.category))
  }, [report.category, dispatch])

  return (
    <div className="report-block">
      <span>{report.createdAt}</span>
      <span>{report.amount}</span>
      <span>{categoryItem?.title}</span>
    </div>
  );
};

export default ReportItem;