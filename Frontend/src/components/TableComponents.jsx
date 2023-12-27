import React, { useEffect, useState } from "react";
import { fetchItems, createItem, updateItem, deleteItem } from "./api";
import PopupComponent from "./PopupComponent";

const TableComponent = () => {
  const handleRefresh = async () => {
    try {
      const updatedItems = await fetchItems();
      setItems(updatedItems);
    } catch (error) {
      console.error("Error refreshing items:", error);
    }
  };

  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getItems();
  }, []);

  const handleCreate = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleRead = async () => {
    try {
      const updatedItems = await fetchItems();
      setItems(updatedItems);
    } catch (error) {
      console.error("Error reading items:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedItem) {
        await updateItem(selectedItem._id, formData);
      } else {
        await createItem(formData);
      }
      const updatedItems = await fetchItems();
      setItems(updatedItems);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <section>
      <div className="container">
        <div className="heading-text">
          <h1
            className="font-weight-bolder"
            style={{ color: "rgb(103, 103, 103)" }}
          >
            Crud Operations Task
          </h1>
        </div>
        <div className="table-container">
          <div className="btn-group pt-3">
            <button className="btn1 px-3 py-1" onClick={handleCreate}>
              Create
            </button>
            <button className="btn2 px-3 py-1" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
          <div className="container mt-4">
            <table>
              <thead>
                <tr>
                  <th>Materials</th>
                  <th>Production Cost</th>
                  <th>Consumption Items</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.materials}</td>
                    <td>{item.productionCost}</td>
                    <td>{item.consumptionItems}</td>
                    <td className="d-flex gap-4">
                      <button
                        className="px-3 py-1"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                      <button className=" px-3 py-1" onClick={handleRead}>
                        Read
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <PopupComponent
              onClose={() => setIsModalOpen(false)}
              item={selectedItem}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TableComponent;
