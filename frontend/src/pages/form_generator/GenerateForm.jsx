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
    if (response.type === "success") {
      alert(response.message);
    } else {
      alert(response.message);
    }
  };

  return (
    <Container maxWidth sx={{ mt: 4, overflowY: "scroll" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Form Generator
      </Typography>
    
      <FormControl fullWidth margin="normal">
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

      <FormControl fullWidth margin="normal">
        <InputLabel shrink>Recipients</InputLabel>
        <Select
          multiple
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          renderValue={(selected) => selected.join(", ")}
        >
          {["HR", "Finance", "IT", "Marketing"].map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel shrink>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {["Event", "Department Data", "Achievements", "Other"].map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel shrink>Submission Type</InputLabel>
        <Select
          value={submissionType}
          onChange={(e) => setSubmissionType(e.target.value)}
        >
          <MenuItem value="one-time">One Time</MenuItem>
          <MenuItem value="multiple">Multiple</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        fullWidth
        sx={{ mt: 2 }}
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
          <InputLabel>Type</InputLabel>
          <Select
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={addCustomField}>
          Add
        </Button>
      </Stack>

      <hr />

      <Typography variant="h5" color="initial">
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
            key={index}
            label={field.name}
            type={field.type}
            sx={{ mt: 2 }}
            disabled
          />
          <Button
            varient="contained"
            onClick={() => removeCustomField(index)}
            sx={{ mt: 2 }}
          >
            Remove
          </Button>
        </Stack>
      ))}

      <Stack direction={"row"} spacing={2} alignItems="center" justifyContent="center" maxWidth>
        <Button variant="outlined" color="primary" onClick={handleSubmitForm}>
          Generate
        </Button>
        <Button varient="outlined">Cancel</Button>
      </Stack>

    </Container>
  );
};

export default GenerateForm;
