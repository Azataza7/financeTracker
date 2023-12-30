import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {createCategory, fetchCategory} from '../../store/Category/CategoryThunks';
import {useNavigate} from 'react-router-dom';

const ModalCreateCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [showModal, setShowModal] = useState(false);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTitle('');
    setType('');
  };

  const handleSave = async () => {
    const data = {title, type};
    await dispatch(createCategory(data));
    await dispatch(fetchCategory());
    closeModal();
  };

  return (
    <>
      <button className="add-category-button btn btn-primary" onClick={openModal}>
        Add
      </button>
      {showModal && (
        <div className="modal-category">
          <div className="backdrop" onClick={closeModal}/>
          <div className="modal-content">
            <h2>Add Category</h2>
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
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCreateCategory;