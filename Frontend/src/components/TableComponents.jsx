import React, { useEffect, useState } from "react";
import { fetchItems, createItem, updateItem } from "./api";
import PopupComponent from "./PopupComponent";
import { GoPlus } from "react-icons/go";

const TableComponent = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortOrder, setSortOrder] = useState({});

  const [uniqueMaterials, setUniqueMaterials] = useState([]);
  const [uniqueProductionCosts, setUniqueProductionCosts] = useState([]);
  const [uniqueConsumptionItems, setUniqueConsumptionItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchItems();
        setItems(data);

        const uniqueMaterialsList = [...new Set(data.map(item => item.materials))];
        const uniqueProductionCostsList = [...new Set(data.map(item => item.productionCost))];
        const uniqueConsumptionItemsList = [...new Set(data.map(item => item.consumptionItems))];

        setUniqueMaterials(uniqueMaterialsList);
        setUniqueProductionCosts(uniqueProductionCostsList);
        setUniqueConsumptionItems(uniqueConsumptionItemsList);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortItems = (column, order) => {
    let sortedItems = [...items];

    sortedItems.sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setItems([...sortedItems]);
  };

  const handleAddProcess = async (newItemData) => {
    try {
      await createItem(newItemData);
      const updatedItems = await fetchItems();
      setItems(updatedItems);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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

  const handleSort = (column, order) => {
    setSortOrder({ column, order });
    sortItems(column, order);
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
                  <th className="sticky-top">#</th>
                  <th className="sticky-top">
                    <div className="dropdown">
                      Process Name
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></button>
                      <ul className="dropdown-menu">
                        <li onClick={() => handleSort("materials", "asc")}>
                          <a className="dropdown-item" href="#">
                            A-Z
                          </a>
                        </li>
                        <li onClick={() => handleSort("materials", "desc")}>
                          <a className="dropdown-item" href="#">
                            Z-A
                          </a>
                        </li>
                        {uniqueMaterials.map((material, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              sortItems(
                                "materials",
                                material,
                                sortOrder.order || "asc"
                              )
                            }
                          >
                            <a className="dropdown-item" href="#">
                              {material}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </th>

                  <th className="sticky-top">
                    <div className="dropdown">
                      Production Items
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></button>
                      <ul className="dropdown-menu">
                        <li onClick={() => handleSort("productionCost", "asc")}>
                          <a className="dropdown-item" href="#">
                            Low to High
                          </a>
                        </li>
                        <li
                          onClick={() => handleSort("productionCost", "desc")}
                        >
                          <a className="dropdown-item" href="#">
                            High to Low
                          </a>
                        </li>
                        {uniqueProductionCosts.map((cost, index) => (
                          <li
                            key={index}
                            onClick={() => sortItems("productionCost", cost)}
                          >
                            <a className="dropdown-item" href="#">
                              {cost}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </th>

                  <th className="sticky-top">
                    <div className="dropdown">
                      Consumption Items
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></button>
                      <ul className="dropdown-menu">
                        <li
                          onClick={() => handleSort("consumptionItems", "asc")}
                        >
                          <a className="dropdown-item" href="#">
                            A-Z
                          </a>
                        </li>
                        <li
                          onClick={() => handleSort("consumptionItems", "desc")}
                        >
                          <a className="dropdown-item" href="#">
                            Z-A
                          </a>
                        </li>
                        {uniqueConsumptionItems.map((consumption, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              sortItems("consumptionItems", consumption)
                            }
                          >
                            <a className="dropdown-item" href="#">
                              {consumption}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.materials}</td>
                    <td>{item.productionCost}</td>
                    <td>{item.consumptionItems}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <PopupComponent
              onClose={() => setIsModalOpen(false)}
              onSave={handleSave}
              onAdd={handleAddProcess}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TableComponent;
