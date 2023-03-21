import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const EditItem = ({ item, onCancel, onSave }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editedItem);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="itemName">
        <Form.Control
          type="text"
          name="name"
          value={editedItem.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="itemQuantity">
        <Form.Control
          type="number"
          name="quantity"
          value={editedItem.quantity}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="itemDescription">
        <Form.Control
          as="textarea"
          name="description"
          value={editedItem.description}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default EditItem;
