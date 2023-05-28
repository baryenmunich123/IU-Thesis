import { Button } from "@mui/material";
import React, { useEffect } from "react";

function FormInput(props) {
  const { item, index, label, handleChangeLabel, remove, handleRemoveLabel } =
    props;
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(label);
  const toggleEditing = () => {
    setEditing(!editing);
  };
  return (
    <div>
      <br />
      <label htmlFor={`items[${index}].name`}>{label}</label>
      {item.type === "textarea" ? (
        <textarea style={{ marginLeft: "20px" }} rows="4" cols="20"></textarea>
      ) : (
        <input
          style={{ marginLeft: "10px" }}
          type={item.type}
          name={`items[${index}].name`}
          defaultValue={item.name}
        />
      )}

      <Button
        variant="contained"
        style={{
          height: "30px",
          color: "white",
          marginLeft: "10px",
        }}
        onClick={() => {
          toggleEditing();
        }}
      >
        Modify
      </Button>
      <Button
        style={{
          height: "30px",
          color: "tomato",
          borderColor: "tomato",
          marginLeft: "10px",
        }}
        variant="outlined"
        onClick={() => {
          handleRemoveLabel(index);
          remove(index);
        }}
      >
        Remove
      </Button>
      {editing && (
        <>
          <label style={{ marginLeft: "10px" }}>New name:</label>
          <input
            style={{ marginLeft: "10px" }}
            type="text"
            defaultValue={value}
            onChange={(event) => setValue(event.target.value)}
          ></input>
          <Button
            variant="contained"
            style={{
              height: "30px",
              color: "white",
              marginLeft: "10px",
            }}
            onClick={() => {
              handleChangeLabel(value, index);
              toggleEditing();
            }}
          >
            Confirm
          </Button>
        </>
      )}
    </div>
  );
}

export default FormInput;
