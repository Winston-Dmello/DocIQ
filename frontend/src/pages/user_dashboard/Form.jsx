import {
  Button,
  Container,
  Card,
  CardContent,
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getform, submitform } from "./form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Form = () => {
  const [form, setForm] = useState({});
  const [formdata, setFormData] = useState([]);
  const [files, setFiles] = useState([]);
  const { formID } = useParams();
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e, idx, fieldName, fieldType) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [idx]: {
        field_name: fieldName,
        value: e.target.value,
        field_type: fieldType,
      },
    }));
  };

  async function fetchForms() {
    const response = await getform(formID);
    setForm(response);
    setFormData(response.form_data);
  }

  const handleFileChange = (e) => {
    if (!e.target.files.length) return;

    const newFiles = Array.from(e.target.files).map((file) => ({
      file_name: "",
      file: file,
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new files
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (index, value) => {
    setFiles((prevFiles) =>
      prevFiles.map((fileObj, i) =>
        i === index ? { ...fileObj, file_name: value } : fileObj
      )
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload at least one file.");
      return;
    }
  
    const submissionData = Object.values(formValues);
  
    const file_list = files.map((file) => ({
      original_name: file.file.name,
      file_name: file.file_name,
    }));
  
    const formData = new FormData();
    formData.append("form_id", formID);
    formData.append("user_id", localStorage.getItem("UserID"));
    formData.append("submission_data", JSON.stringify(submissionData));
    formData.append("file_list", JSON.stringify(file_list));
  
    files.forEach((fileObj) => {
      formData.append("files", fileObj.file);
    });
  
    console.log(formData);
    const res = submitform(formData);
    console.log(res);
    alert("Form Submitted");
  };
  

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <Container maxWidth sx={{ height: "100%" }}>
      <Card
        elevation={4}
        sx={{
          height: "95%",
          p: 4,
          borderRadius: 3,
          padding: 5,
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          {form.form_name || "Loading..."}
        </Typography>
        <CardContent>
          <form>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {formdata.map((field, index) => (
                <Box
                  key={index}
                  sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "250px" }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type={field.type}
                    name={field.name}
                    label={field.name}
                    required
                    value={formValues[index]?.value || ""}
                    onChange={(e) => handleInputChange(e, index, field.name, field.type)}
                    InputLabelProps={
                      field.type === "date" ? { shrink: true } : {}
                    }
                    
                  />
                </Box>
              ))}
            </Box>

            {/* File Upload */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                Upload Files
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
            </Box>

            {/* Display Selected Files */}
            {files.length > 0 && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "background.default",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="text.primary">
                  Selected Files:
                </Typography>
                <List dense sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {files.map((fileObj, index) => (
                    <ListItem
                      key={index}
                      sx={{ p: 0, display: "flex", gap: 2, width: "50%" }}
                    >
                      <TextField
                        label="File Description"
                        variant="outlined"
                        required
                        value={fileObj.file_description}
                        onChange={(e) =>
                          handleDescriptionChange(index, e.target.value)
                        }
                      />
                      <ListItemText primary={fileObj.file.name} />
                      <Button onClick={() => handleRemoveFile(index)}>
                        Remove
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Submit Button */}
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={onSubmit}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Form;
