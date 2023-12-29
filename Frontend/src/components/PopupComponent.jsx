import React, { useState } from 'react';
import { createItem } from './api';

const PopupComponent = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    materials: '',
    productionCost: '',
    consumptionItems: '',
  });

  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem(formData);
      onAdd(formData);
      setIsOpen(false);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className={`popup-container ${isOpen ? '' : 'closed'}`}>
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <form className='d-flex flex-column gap-5'>
          <input
            type="text"
            name="materials"
            placeholder="Process Name"
            value={formData.materials}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="productionCost"
            placeholder="Production Cost"
            value={formData.productionCost}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="consumptionItems"
            placeholder="Consumption Items"
            value={formData.consumptionItems}
            onChange={handleChange}
            required
          />
          <button onClick={handleSubmit} type="submit">Add Process</button>
        </form>
      </div>
    </div>
  );
};

export default PopupComponent;
