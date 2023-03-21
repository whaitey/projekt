import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddNewItem = async (item) => {
    try {
      const response = await axios.post("http://localhost:5000/api/items", item);
      if (response.status === 201) {
        setItems([response.data, ...items]);
      } else {
        console.error(`Error adding item: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  

  const handleItemEdit = async (id, editedItem) => {
    try {
      console.log("Edited item data:", editedItem);
      const response = await axios.put(`/api/items/${id}`, editedItem);
      setItems(
        items.map((item) => (item._id === response.data._id ? response.data : item))
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  

  return (
    <div className="App">
      <h1>Item List</h1>
      <AddItem onAddNewItem={handleAddNewItem} />
      <ItemList items={items} setItems={setItems} onSaveEdit={handleItemEdit} />
    </div>
  );
}

export default App;
