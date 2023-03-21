import React from "react";

const Item = ({ item, handleEdit }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.description}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
      </td>
    </tr>
  );
};

export default Item;
