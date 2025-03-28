import { useState, useEffect } from "react";
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
import { generateForm, getUsers, getCategories } from "./generateForm";
import SnackbarService from "../../utils/SnackbarService";

const GenerateForm = () => {
  const [formName, setFormName] = useState("");
  const [users, setUsers] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [categories, setCategories] = useState([]);
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

  async function fetchUsers() {
    const response = await getUsers();
    setUsers(response);
    const data = await getCategories();
    setCategories(data);
  }

  const removeCustomField = (index) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  const handleSubmitForm = async () => {

    if (!formName.trim()) {
      SnackbarService.showSnackbar("Please provide a form name.", {severity: "warning"});
      return;
    }
    if (recipients.length === 0) {
      SnackbarService.showSnackbar("Please select at least one recipient.", {severity: "warning"});
      return;
    }
    if (!category) {
      SnackbarService.showSnackbar("Please select a category.", {severity: "warning"});
      return;
    }

    const response = await generateForm(
      formName,
      recipients,
      category,
      submissionType,
      customFields
    );
    SnackbarService.showSnackbar(response.message);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
                renderValue={(selectedIds) =>
                  selectedIds.length > 0
                    ? selectedIds
                        .map((id) => users.find((user) => user.user_id === id)?.user_name || "Unknown")
                        .join(", ")
                    : ""
                }
              >
                {users.map((user, index) => (
                  <MenuItem
                    key={index}
                    value={user.user_id}
                    sx={{ color: "text.primary" }}
                  >
                    {user.user_name}
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
                {categories.map(
                  (cat) => (
                    <MenuItem
                      key={cat.category_id}
                      value={cat.category_name}
                      sx={{ color: "text.primary" }}
                    >
                      {cat.category_name}
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
