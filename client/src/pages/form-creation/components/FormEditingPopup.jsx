import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm, useFieldArray } from "react-hook-form";
import FormInput from "./FormInput";
import dayjs from "dayjs";
import axios from "axios";
import Notification from "../../../components/Snackbar/snackbar";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 24,
  p: 4,
};

export default function FormEditing(props) {
  const { handleCloseForm, ExistingFormData } = props;
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items", // Name of the array field
  });
  const [isModified, setIsModified] = useState(false);
  const [open, setOpen] = useState(true);
  const [formName, setFormName] = useState(props.form_name);
  const [formFile, setFormFile] = useState(props.form_file);
  const [labels, setLabels] = useState([]);
  const [form_title, setForm_title] = useState(props.form_title);
  const handleClose = () => {
    setOpen(false);
    handleCloseForm();
  };
  const handleChangeLabel = (label, index) => {
    const newLabels = [...labels];
    newLabels[index] = label;
    setLabels(newLabels);
  };
  const handleRemoveLabel = (indexToRemove) => {
    setLabels((prevLabels) =>
      prevLabels.filter((_, index) => index !== indexToRemove)
    );
  };
  function isBase64String(str) {
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    return base64Regex.test(str);
  }
  useEffect(() => {
    ExistingFormData.map((item) => {
      const { id, type } = item;
      append({ id, type });
      setLabels((prevItems) => [...prevItems, item.label]);
    });
  }, []);
  const onSubmit = () => {
    async function handleUpdateForm(form_name, form_file, form_data) {
      const date = dayjs(); // Get the current date
      const formattedDate = date.format("YYYY-MM-DD");
      const form_no = props.form_no;
      const formData = {
        form_name,
        form_file,
        form_data,
        formattedDate,
        form_title,
        form_no,
      };
      await axios
        .post("http://localhost:8080/updateDynamicForm", formData)
        .then((res) => {
          setIsModified(res.data.message);
          setTimeout(() => {
            setIsModified(false);
            location.reload();
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (formName && formFile) {
      const form_data = labels.map((label, index) => ({
        label,
        ...fields[index],
      }));
      form_data.unshift({ label: "Ngày lập yêu cầu", id: "date", date: "" });
      form_data.unshift({
        label: "Số điện thoại",
        id: "phonenumber",
        value: "",
      });
      //File not changed
      if (isBase64String(formFile)) {
        handleUpdateForm(formName, formFile, JSON.stringify(form_data));
      } else {
        // Convert file to base64
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const base64 = fileReader.result.split(",")[1];
          handleUpdateForm(formName, base64, JSON.stringify(form_data));
        };
        fileReader.readAsDataURL(formFile);
      }
    }
  };
  const handleFormFileInputChange = (event) => {
    const file = event.target.files[0];
    setFormFile(file);
    setForm_title(file.name);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={"1000px"} height={"80%"} sx={style}>
          {isModified && <Notification message={isModified} />}
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <Box
              display={"Flex"}
              justifyContent={"space-between"}
              borderBottom={"1px solid black"}
              paddingBottom={"10px"}
            >
              <Box>
                <label>Form name*:</label> <br />
                <input
                  type="text"
                  defaultValue={formName}
                  onChange={(event) => {
                    setFormName(event.target.value);
                  }}
                ></input>
              </Box>
              <Box width={"35%"}>
                <label>File Upload*: {form_title}</label> <br />
                <input
                  type="file"
                  id="files"
                  onChange={handleFormFileInputChange}
                ></input>
              </Box>
            </Box>
            <Box
              display={"Flex"}
              justifyContent={"space-between"}
              padding={"10px"}
            >
              <Box width={"48%"} display={"flex"} flexDirection={"column"}>
                <Box>
                  <label>Verifier*:</label> <br />
                  <select style={{ width: "29%    " }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </Box>
              </Box>
              <Box width={"35%"} display={"flex"} flexDirection={"column"}>
                <Box width={"100%"}>
                  <label>Approver*:</label> <br />
                  <select style={{ width: "40%    " }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </Box>
                <Box>
                  <label>Executer*:</label> <br />
                  <select style={{ width: "40%    " }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </Box>
              </Box>
            </Box>
            <Box marginTop={"20px"}>
              <>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => {
                    setLabels((prevItems) => [...prevItems, "Init Label"]);
                    append({ name: "", type: "text" });
                  }}
                >
                  Add Text Input
                </Button>
                <Button
                  style={{ marginLeft: "20px" }}
                  variant="contained"
                  type="button"
                  onClick={() => {
                    setLabels((prevItems) => [...prevItems, "Init Label"]);
                    append({ name: "", type: "date" });
                  }}
                >
                  Add Date Input
                </Button>
                <Button
                  style={{ marginLeft: "20px" }}
                  variant="contained"
                  type="button"
                  onClick={() => {
                    setLabels((prevItems) => [...prevItems, "Init Label"]);
                    append({ name: "", type: "textarea" });
                  }}
                >
                  Add Text Area
                </Button>
                <Button
                  style={{ marginLeft: "20px" }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </>
            </Box>
            <Box>
              <Box
                marginTop={"20px"}
                border="0.5px solid grey"
                borderRadius={"8px"}
                padding={"12px"}
              >
                <Box
                  display={"Flex"}
                  justifyContent={"space-between"}
                  borderBottom={"1px solid black"}
                  paddingBottom={"10px"}
                >
                  <Box>
                    <label>Ngày lập yêu cầu*:</label> <br />
                    <input type="date" disabled></input>
                  </Box>
                  <Box width={"35%"}>
                    <label>Số điện thoại*:</label> <br />
                    <input type="text"></input>
                  </Box>
                </Box>
                {fields.map((item, index) => {
                  return (
                    <div key={item.id}>
                      {labels[index] !== "Số điện thoại" &&
                        labels[index] !== "Ngày lập yêu cầu" && (
                          <FormInput
                            key={item.id}
                            item={item}
                            index={index}
                            label={labels[index]}
                            handleChangeLabel={handleChangeLabel}
                            remove={remove}
                            handleRemoveLabel={handleRemoveLabel}
                          />
                        )}
                    </div>
                  );
                })}
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
