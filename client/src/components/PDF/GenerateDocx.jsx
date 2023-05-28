import React, { useEffect, useState } from "react";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import { Button } from "@mui/material";
import Notification from "../Snackbar/snackbar";
const GenDocx = (props) => {
  const { formData, dynamicFormData } = props;
  const [isSelectedFile, setIsSelectedFile] = useState(true);
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);
  // Decode the base64 string
  useEffect(() => {
    const binaryData = atob(dynamicFormData.form_file);

    // Create an ArrayBuffer from the binary data
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const docxfile = new File([blob], "file.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    setFile(docxfile);
  }, []);
  const generate = (e) => {
    e.preventDefault();
    if (!file) {
      setIsSelectedFile(false);

      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      const data = formData;
      doc.setData(data);
      doc.render();

      const generatedBlob = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE",
      });
      const generatedURL = URL.createObjectURL(generatedBlob);
      setOutput(generatedURL);

      saveAs(generatedBlob, "generated.docx");
    };

    reader.readAsBinaryString(file);
  };
  return (
    <>
      <div className="p-2">
        {!isSelectedFile && <Notification message="No file selected" />}
        <Button variant="contained" onClick={generate}>
          Generate document
        </Button>
      </div>
    </>
  );
};

export default GenDocx;
