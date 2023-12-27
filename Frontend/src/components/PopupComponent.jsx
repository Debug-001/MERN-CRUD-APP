import React, { useState } from 'react';
import { createItem } from './api';

const PopupComponent = ({ onClose }) => {
  const [formData, setFormData] = useState({
    materials: '',
    productionCost: '',
    consumptionItems: '',
  });

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
      onClose(); 
      alert('Item created successfully!');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit} className='d-flex gap-5'>
          <input
            type="text"
            name="materials"
            placeholder="Materials"
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
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default PopupComponent;
