import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";

function AddItem({ onAddNewItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "quantity") {
      setQuantity(value);
    } else {
      setDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, quantity, description };
  
    try {
      const response = await axios.post("http://localhost:5000/api/items", newItem);
      onAddNewItem(response.data);
      setShowModal(false);
      setName("");
      setQuantity("");
      setDescription("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Add new item</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Add Item</Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddItem;
