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
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getsubmission } from "./submission";
import { useNavigate } from "react-router-dom";
import { getFilePath } from "./submission";

const Submission = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const { submissionID } = useParams();
  const navigate = useNavigate();

  async function fetchSubmission() {
    try {
      const data = await getsubmission(submissionID);
      setSubmission(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubmission();
  }, [submissionID]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" align="center">
          Loading submission...
        </Typography>
      </Container>
    );
  }

  if (!submission) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" align="center" color="error">
          Failed to load submission.
        </Typography>
      </Container>
    );
  }

  const handleCloseButton = () => {
    navigate(-1);
  };

  const handleViewDocument = async (file_path) => {
    const path = await getFilePath(file_path);
    console.log(path);
    window.open(path, "_blank");
}

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
          {submission.form?.form_name || "No Form Name"}
        </Typography>
        <CardContent>
          <form>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {submission.submission_data?.map((field, index) => (
                <Box
                  key={index}
                  sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "250px" }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type={field.field_type}
                    name={field.name}
                    label={field.field_name}
                    required
                    value={field.value || ""}
                    disabled
                    InputLabelProps={
                      field.type === "date" ? { shrink: true } : {}
                    }
                  />
                </Box>
              ))}
            </Box>

            {/* Display Selected Files */}
            {submission.file_paths?.length > 0 && (
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
                  {submission.file_paths.map((fileObj, index) => (
                    <ListItem
                      key={index}
                      sx={{ p: 0, display: "flex", gap: 2, width: "50%" }}
                    >
                      <Typography
                        component="a"
                        onClick={() => handleViewDocument(fileObj)}
                        rel="noopener noreferrer"
                        sx={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "blue",
                        }}
                      >
                        {fileObj.includes("$$$")
                          ? fileObj.split("$$$")[1]
                          : fileObj}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Submit Button */}
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="inherit"
                fullWidth
                onClick={handleCloseButton}
              >
                Close
              </Button>
              <Button variant="contained" color="success" fullWidth>
                Edit
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Submission;
