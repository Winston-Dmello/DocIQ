import { useState } from "react";
import {
  Typography,
  Container,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Stack,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { generateForm } from "./generateForm";

const GenerateForm = () => {
  const [formName, setFormName] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [category, setCategory] = useState("");
  const [submissionType, setSubmissionType] = useState("one-time");
  const [customFields, setCustomFields] = useState([]);
  const [newField, setNewField] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");

  const addCustomField = () => {
    if (newField.trim()) {
      setCustomFields([
        ...customFields,
        { name: newField, type: newFieldType },
      ]);
      setNewField("");
      setNewFieldType("text");
    }
  };

  const removeCustomField = (index) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  const handleSubmitForm = async () => {
    const response = await generateForm(
      formName,
      recipients,
      category,
      submissionType,
      customFields
    );
    alert(response.message);
  };

  return (
    <Container maxWidth>
      <Card
        sx={{
          height: "95%",
          padding: 6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "sticky",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            Form Generator
          </Typography>
        </Box>

        <CardContent sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "70vh" }}>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <FormControl fullWidth sx={{ flex: "1" }}>
              <TextField
                id="form_name"
                label="Form Name"
                variant="outlined"
                fullWidth
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ flex: "1" }}>
              <InputLabel shrink sx={{ color: "text.primary" }}>
                Recipients
              </InputLabel>
              <Select
                label="Recipients"
                displayEmpty
                multiple
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                renderValue={(selected) => selected.join(", ")}
              >
                {["HR", "Finance", "IT", "Marketing"].map((dept) => (
                  <MenuItem
                    key={dept}
                    value={dept}
                    sx={{ color: "text.primary" }}
                  >
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
            <FormControl fullWidth sx={{ flex: "1" }}>
              <InputLabel shrink sx={{ color: "text.primary" }}>
                Category
              </InputLabel>
              <Select
                label="Category"
                displayEmpty
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {["Event", "Department Data", "Achievements", "Other"].map(
                  (cat) => (
                    <MenuItem
                      key={cat}
                      value={cat}
                      sx={{ color: "text.primary" }}
                    >
                      {cat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ flex: "1" }}>
              <InputLabel shrink sx={{ color: "text.primary" }}>
                Submission Type
              </InputLabel>
              <Select
                label="Submission Type"
                value={submissionType}
                onChange={(e) => setSubmissionType(e.target.value)}
              >
                <MenuItem value="one-time" sx={{ color: "text.primary" }}>
                  One Time
                </MenuItem>
                <MenuItem value="multiple" sx={{ color: "text.primary" }}>
                  Multiple
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "primary.main",
              color: "secondary.main",
            }}
            disabled
          >
            Upload File
            <input type="file" hidden />
          </Button>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <TextField
              label="Form Field Name"
              fullWidth
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: "text.primary" }}>Type</InputLabel>
              <Select
                displayEmpty
                label="Type"
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
              >
                <MenuItem value="text" sx={{ color: "text.primary" }}>
                  Text
                </MenuItem>
                <MenuItem value="number" sx={{ color: "text.primary" }}>
                  Number
                </MenuItem>
                <MenuItem value="date" sx={{ color: "text.primary" }}>
                  Date
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={addCustomField}
              sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
            >
              Add
            </Button>
          </Stack>

          <hr style={{ borderColor: "primary.main", margin: "20px 0" }} />

          <Typography
            variant="h5"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            Fields
          </Typography>

          {customFields.map((field, index) => (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 4 }}
              key={index}
            >
              <TextField
                label={field.name}
                type={field.type}
                sx={{ mt: 2, flexGrow: 1 }}
                disabled
                InputLabelProps={field.type === "date" ? { shrink: true } : {}}
              />
              <Button
                variant="contained"
                onClick={() => removeCustomField(index)}
                sx={{
                  mt: 2,
                  backgroundColor: "primary.main",
                  color: "secondary.main",
                }}
              >
                Remove
              </Button>
            </Stack>
          ))}

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              onClick={handleSubmitForm}
              sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
            >
              Generate
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: "primary.main", color: "text.primary" }}
            >
              Cancel
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default GenerateForm;
