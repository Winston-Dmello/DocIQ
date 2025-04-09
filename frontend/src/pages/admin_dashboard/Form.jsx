import {
    Button,
    Container,
    Card,
    CardContent,
    Box,
    TextField,
    Typography,
  } from "@mui/material";
  import CloudUploadIcon from "@mui/icons-material/CloudUpload";
  import { getform } from "./form";
  import { useEffect, useState } from "react";
  import { useNavigate,useParams } from "react-router-dom";

  
  const Form = () => {
    const [form, setForm] = useState({});
    const [formdata, setFormData] = useState([]);
    const navigate = useNavigate();
  
  
    const { formID } = useParams();
  
    async function fetchForms() {
      const response = await getform(formID);
      setForm(response);
      setFormData(response.form_data);
    }
    
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
                      InputLabelProps={
                        field.type === "date" ? { shrink: true } : {}
                      }
                      disabled
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
                  disabled
                >
                  Upload Files
                  <input
                    type="file"
                    hidden
                    multiple
                    disabled
                  />
                </Button>
              </Box>
  
              
  
              {/* Submit Button */}
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(-1)}
                >
                  Close
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => navigate(`/admin/dashboard/forms/edit/${formID}`)}
                >
                  Edit
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    );
  };
  
  export default Form;
  