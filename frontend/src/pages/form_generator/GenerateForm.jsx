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
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "text.primary", fontWeight: 600 }}
      >
        Form Generator
      </Typography>

      {/* Form Name */}
      <FormControl fullWidth margin="normal">
        <TextField
          id="form_name"
          label="Form Name"
          variant="outlined"
          fullWidth
          required
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "primary.dark",
              },
              "& input": {
                color: "text.primary",
              },
            },
            "& .MuiInputLabel-root": {
              color: "text.primary",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
        />
      </FormControl>

      {/* Recipients */}
      <FormControl fullWidth margin="normal">
        <InputLabel shrink sx={{ color: "text.primary" }}>
          Recipients
        </InputLabel>
        <Select
          multiple
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          renderValue={(selected) => selected.join(", ")}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "primary.dark",
              },
              "& input": {
                color: "text.primary",
              },
            },
            "& .MuiInputLabel-root": {
              color: "text.primary",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
        >
          {["HR", "Finance", "IT", "Marketing"].map((dept) => (
            <MenuItem key={dept} value={dept} sx={{ color: "text.primary" }}>
              {dept}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Category */}
      <FormControl fullWidth margin="normal">
        <InputLabel shrink sx={{ color: "text.primary" }}>
          Category
        </InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "primary.dark",
              },
            },
          }}
        >
          {["Event", "Department Data", "Achievements", "Other"].map((cat) => (
            <MenuItem key={cat} value={cat} sx={{ color: "text.primary" }}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Submission Type */}
      <FormControl fullWidth margin="normal">
        <InputLabel shrink sx={{ color: "text.primary" }}>
          Submission Type
        </InputLabel>
        <Select
          value={submissionType}
          onChange={(e) => setSubmissionType(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "primary.dark",
              },
            },
          }}
        >
          <MenuItem value="one-time" sx={{ color: "text.primary" }}>
            One Time
          </MenuItem>
          <MenuItem value="multiple" sx={{ color: "text.primary" }}>
            Multiple
          </MenuItem>
        </Select>
      </FormControl>

      {/* Upload Button */}
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        fullWidth
        sx={{ mt: 2, backgroundColor: "primary.main", color: "secondary.main" }}
        disabled
      >
        Upload File
        <input type="file" hidden />
      </Button>

      {/* Add Custom Field Section */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <TextField
          label="Form Field Name"
          fullWidth
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "primary.dark",
              },
              "& input": {
                color: "text.primary",
              },
            },
            "& .MuiInputLabel-root": {
              color: "text.primary",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: "text.primary" }}>Type</InputLabel>
          <Select
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.main",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "& input": {
                  color: "text.primary",
                },
              },
              "& .MuiInputLabel-root": {
                color: "text.primary",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
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

      {/* Custom Fields List */}
      <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600 }}>
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

      {/* Generate and Cancel Buttons */}
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
    </Container>
  );
};

export default GenerateForm;
