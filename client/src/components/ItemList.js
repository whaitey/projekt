import React, { useState } from 'react';
import { Table, Button, Pagination } from "react-bootstrap";
import EditItem from "./EditItem";
import axios from "axios";

function ItemList({ items, setItems, onSaveEdit }) {
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleItemDelete = async (id) => {
    const confirmDelete = window.confirm("Biztosan törölni szeretnéd ezt az elemet?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        setItems(items.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
  


  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.slice(startIndex, endIndex).map((item, index) => (
            <tr key={item._id}>
              <td>
                {editingItem === item._id ? (
                  <EditItem
                    item={item}
                    onCancel={() => setEditingItem(null)}
                    onSave={(editedItem) => {
                      onSaveEdit(item._id, editedItem);
                      setEditingItem(null);
                    }}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td>
                {editingItem === item._id ? (
                  <Button
                    variant="secondary"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => setEditingItem(item._id)}
                  >
                    Edit
                  </Button>
                )}
                <Button variant="danger" onClick={() => handleItemDelete(item._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
}

export default ItemList;
