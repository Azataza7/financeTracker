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

  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState(0);
  const createdAt = new Date().toISOString();

  const closeModal = () => {
    dispatch(setShowModal(false));
    setType('');
    setCategory('');
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
    console.log(report.amount)
  }, [report])

  useEffect(() => {
    if (report) {
      setCategory(report.category);
      setType(report.type);
      setAmount(report.amount);
    }
  }, [report]);

  const handleSave = async () => {
    if (!category || !type) {
      alert('Please fill inputs or press Cancel');
      return;
    }

    if (id) {
      await dispatch(updateReport({id: id, data: {category, type, amount, createdAt}}));
    } else {
      await dispatch(createReport({category, type, amount, createdAt}));
    }
    await dispatch(fetchReports());
    closeModal();
  };

  return (
    <>{showModal ? (<div className="modal-category">
      <div className="backdrop" onClick={closeModal}/>
      <div className="modal-content">
        <h2>{id ? 'Edit report' : 'Add report'}</h2>
        <select
          className="category-options"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select type</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <select
          className="type-options"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="number"
          className="amount-input"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="modal-buttons">
          <button className="btn btn-primary" disabled={onCreateLoading} onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" disabled={onCreateLoading} onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>) : ''}
    </>
  );
};

export default ModalCreateReport;