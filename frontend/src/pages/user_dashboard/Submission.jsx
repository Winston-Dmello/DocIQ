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
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getSubmission } from "./submission";

const Submission = () => {

  const [submission, setSubmission] = useState([]);
  const { submissionID } = useParams();

  async function fetchSubmission() {
    console.log("Calling API");
    const data = await getSubmission(submissionID);
    console.log(data);
    setSubmission(data);
  }

  useEffect(() => {
    fetchSubmission();
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
          {submission.form.form_name || "Loading..."}
        </Typography>
        <CardContent>
          <form>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {submission.submission_data.map((field, index) => (
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
            {submission.file_paths.length > 0 && (
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
                      <TextField
                        label="File Description"
                        variant="outlined"
                        disabled
                        value={fileObj}
                      />
                      <ListItemText primary={fileObj.file.name} />
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

export default Submission;
