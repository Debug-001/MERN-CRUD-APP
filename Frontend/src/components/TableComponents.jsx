import React, { useEffect, useState } from "react";
import { fetchItems, createItem, updateItem, deleteItem } from "./api";
import PopupComponent from "./PopupComponent";
import { GoPlus } from "react-icons/go";

const TableComponent = () => {
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
        <div className="heading-text mt-5">
          <p className="font-weight-bold" style={{ color: "grey" }}>
            Master BOM
          </p>
          <h1 style={{ color: "#000" }}>
            Rear Grill-CFH-CB
            <div className="btn-group ">
              <button
                className="btn1 d-flex justify-content-center align-items-center"
                onClick={handleCreate}
              >
                <GoPlus className="mx-1" size={18} />
                Add Process
              </button>
            </div>
          </h1>
        </div>
        <div className="table-container">
          <div className="container mt-4">
            <table>
              <thead>
                <tr>
                  <th>
                    #
                    <button
                      type="button"
                      class="btn  dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          <input type="checkbox" name="" id="" /> A-Z
                        </a>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <input type="checkbox" name="" id="" /> Z-A
                        </a>
                      </li>
                    </ul>
                  </th>
                  <th>
                    Process Name
                    <button
                      type="button"
                      class="btn  dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          <input type="checkbox" name="" id="" /> A-Z
                        </a>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <input type="checkbox" name="" id="" /> Z-A
                        </a>
                      </li>
                    </ul>
                  </th>

                  <th>
                    Production Items
                    <button
                      type="button"
                      class="btn  dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          <input type="checkbox" name="" id="" /> A-Z
                        </a>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <input type="checkbox" name="" id="" /> Z-A
                        </a>
                      </li>
                    </ul>
                  </th>

                  <th>
                    Consumtion Items
                    <button
                      type="button"
                      class="btn  dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          <input type="checkbox" name="" id="" /> A-Z
                        </a>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <input type="checkbox" name="" id="" /> Z-A
                        </a>
                      </li>
                    </ul>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                   <tr key={item._id}>
                   <td>{item.materials}</td>
                   {/* <td className="vr"></td> .vr line goes here */}
                   <td>{item.productionCost}</td>
                   {/* <td className="vr"></td> .vr line goes here */}
                   <td>{item.consumptionItems}</td>
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
