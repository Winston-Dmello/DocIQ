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
  ListItemText
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getform } from "./form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Form = () => {
  const [form, setForm] = useState({});
  const [formdata, setFormData] = useState([]);
  const [files, setFiles] = useState([]);
  const { formID } = useParams();

  async function fetchForms() {
    const response = await getform(formID);
    setForm(response);
    setFormData(response.form_data);
  }

  const handleFileChange = (e) => {
    setFiles([...e.target.files]); // Store multiple files
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload at least one file.");
      return;
    }
    console.log("Submitted files:", files);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <Container maxWidth sx={{ height: "100%" }}>
      <Card
        elevation={4}
        sx={{ height: "95%", p: 4, borderRadius: 3, padding: 5, overflowY: "auto" }}
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
                <List dense>
                  {files.map((file, index) => (
                    <ListItem key={index} sx={{ p: 0 }}>
                      <ListItemText primary={file.name} />
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
