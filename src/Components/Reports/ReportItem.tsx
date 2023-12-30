import React from 'react';
import {category, report} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories, selectShowModal, setShowModal} from '../../store/Category/CategorySlice';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {selectFetchReportLoading} from '../../store/Tracker/TrackerSlice';
import {deleteReport, fetchReports} from '../../store/Tracker/TrackerThunks';

interface Props {
  report: report;
}

const ReportItem: React.FC<Props> = ({report}) => {
  const dispatch = useAppDispatch();
  const categories: category[] = useAppSelector(selectCategories);
  const onLoading: boolean = useAppSelector(selectFetchReportLoading);
  const showModal: boolean = useAppSelector(selectShowModal);

  const categoryItem = categories.find(category => category.id == report.category)

  const handleShowModal = () => {
    dispatch(setShowModal(!showModal));
  };

  const handleDelete = async () => {
    await dispatch(deleteReport(report.id));
    await dispatch(fetchReports());
  };

  const amountStyle = categoryItem.type === 'Income' ? 'green' : 'red';

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