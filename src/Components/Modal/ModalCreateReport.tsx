import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories, selectShowModal, setShowModal} from '../../store/Category/CategorySlice';
import {useNavigate, useParams} from 'react-router-dom';
import {selectCreateReportLoading, selectReportItem} from '../../store/Tracker/TrackerSlice';
import {createReport, fetchReportItem, fetchReports, updateReport} from '../../store/Tracker/TrackerThunks';
import {fetchCategory} from '../../store/Category/CategoryThunks';
import {typeOfReport} from '../../types';

const ModalCreateReport = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const showModal = useAppSelector(selectShowModal);
  const onCreateLoading = useAppSelector(selectCreateReportLoading);
  const report: typeOfReport = useAppSelector(selectReportItem);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    type: '',
    amount: 0,
    createdAt: new Date().toISOString(),
  });

  const {category, type, amount, createdAt} = formData;

  const closeModal = () => {
    dispatch(setShowModal(false));
    setFormData({category: '', type: '', amount: 0, createdAt: new Date().toISOString()});
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [fetchCategory]);

  useEffect(() => {
    if (id) {
      dispatch(fetchReportItem(id));
    }
  }, [id]);

  useEffect(() => {
    if (report) {
      setFormData({...formData, category: report.category, type: report.type, amount: report.amount});
    }
  }, [report]);

  const handleSave = async () => {
    if (!category || !type) {
      alert('Please fill inputs or press Cancel');
      return;
    }
    const reportData = {category, type, amount, createdAt};

    if (id) {
      await dispatch(updateReport({id, data: reportData}));
    } else {
      await dispatch(createReport(reportData));
    }
    await dispatch(fetchReports());
    closeModal();
  };

  return (
    <>
      {showModal && (
        <div className="modal-category">
          <div className="backdrop" onClick={closeModal}/>
          <div className="modal-content">
            <h2>{id ? 'Edit report' : 'Add report'}</h2>

            <select
              className="type-options"
              value={type}
              onChange={(e) => {
                const selectedType = e.target.value;
                setFormData({...formData, type: selectedType});
              }}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <select
              className="category-options"
              value={category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select category</option>
              {categories
                .filter((report) => report.type === type)
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
            </select>

            <input
              type="number"
              className="amount-input"
              value={amount}
              onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
            />
            <div className="modal-buttons">
              <button className="btn btn-primary" disabled={onCreateLoading} onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary" disabled={onCreateLoading} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCreateReport;
