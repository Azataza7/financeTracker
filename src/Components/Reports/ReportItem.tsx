import React, {useEffect} from 'react';
import {report, typesCategory} from '../../types';
import {fetchCategoryItem} from '../../store/Category/CategoryThunks';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategoryItem, selectShowModal, setShowModal} from '../../store/Category/CategorySlice';
import dayjs from 'dayjs';
import {Link, useNavigate} from 'react-router-dom';
import {selectFetchReportLoading} from '../../store/Tracker/TrackerSlice';
import {deleteReport, fetchReports} from '../../store/Tracker/TrackerThunks';

interface Props {
  report: report;
}

const ReportItem: React.FC<Props> = ({report}) => {
  const categoryItem: typesCategory = useAppSelector(selectCategoryItem);
  const dispatch = useAppDispatch();
  const onLoading = useAppSelector(selectFetchReportLoading);
  const showModal = useAppSelector(selectShowModal);

  useEffect(() => {
    dispatch(fetchCategoryItem(report.category));
  }, [report.category, dispatch]);

  const amountStyle = categoryItem.type === 'Income' ? 'green' : 'red';

  useEffect(() => {
    console.log(categoryItem);
  }, [categoryItem, report]);

  const handleShowModal = () => {
    dispatch(setShowModal(!showModal));
  };

  const handleDelete = async () => {
    await dispatch(deleteReport(report.id));
    await dispatch(fetchReports());
  };

  return (
    <div className="report-block mb-2" style={{border: `3px solid ${amountStyle}`}}>
      <div className="report-body">
        <span className="title-category">{categoryItem?.title}</span>
        <span className="amount" style={{color: amountStyle}}>
          {categoryItem.type === 'Income' ? `+${report.amount} KGS` : `-${report.amount} KGS`}
        </span>
      </div>
      <div className="control-panel-report">
        <span className="created-at">
          {dayjs(report.createdAt).format('DD.MM.YYYY HH:mm:ss')}
        </span>
        <Link
          className="edit-button btn btn-secondary"
          style={{display: onLoading ? 'none' : 'inline-block'}}
          to={'edit/' + report.id}
          onClick={handleShowModal}
        />
        <button className="delete-button btn btn-danger" onClick={handleDelete}/>
      </div>
    </div>
  );
};

export default ReportItem;