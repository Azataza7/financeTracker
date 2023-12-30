import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {createCategory, fetchCategory, fetchCategoryItem, updateCategory} from '../../store/Category/CategoryThunks';
import {useNavigate, useParams} from 'react-router-dom';
import {
  selectCategoryItem,
  selectCreateCategoryLoading, selectShowModal,
  setShowModal
} from '../../store/Category/CategorySlice';

const ModalCreateCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams() as { id: string };
  const onCreateLoading = useAppSelector(selectCreateCategoryLoading);
  const category = useAppSelector(selectCategoryItem);
  const showModal = useAppSelector(selectShowModal);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryItem(id));
    }
  }, [id]);

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setType(category.type);
    }
  }, [category]);

  const openModal = () => {
    dispatch(setShowModal(true));
  };

  const closeModal = () => {
    dispatch(setShowModal(false));
    setTitle('');
    setType('');
    navigate('/categories');
  };

  const handleSave = async () => {
    if (!title || !type) {
      alert('Please fill inputs or press Cancel');
      return;
    }

    if (id) {
      await dispatch(updateCategory({id: id, data: {title, type}}));
    } else {
      await dispatch(createCategory({title, type}));
    }
    await dispatch(fetchCategory());
    closeModal();
  };

  return (
    <>
      <button className="add-category-button btn btn-primary" onClick={openModal}>
        Add
      </button>
      {showModal ? (
        <div className="modal-category">
          <div className="backdrop" onClick={closeModal}/>
          <div className="modal-content">
            <h2>{id ? 'Edit category' : 'Add Category'}</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="category-options"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <div className="modal-buttons">
              <button className="btn btn-primary" disabled={onCreateLoading} onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" disabled={onCreateLoading} onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      ) : ''}
    </>
  );
};

export default ModalCreateCategory;
