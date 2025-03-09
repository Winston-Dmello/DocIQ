import {
  Button,
  Container,
  Card,
  CardContent,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getsubmission, approveSubmission } from "./submission";

const Submission = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const { submissionID } = useParams();

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

  const handleOnApproveClick = async () => {
    const response = await approveSubmission(submissionID, 1, "approved");
    alert(response.message);
    fetchSubmission();
  };

  const handleUndoClick = async () => {
    const response = await approveSubmission(
      submissionID,
      2,
      "sorry i made a mistake"
    );
    alert(response.message);
    fetchSubmission();
  };

  const handleOpenRejectDialog = () => {
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
    setRejectReason(""); // Reset the reason input
  };

  const handleRejectClick = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }

    const response = await approveSubmission(submissionID, 0, rejectReason);
    alert("Submission Rejected", response.message);
    handleCloseRejectDialog();
    fetchSubmission();
  };

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
                        href={`${import.meta.env.VITE_BASE_DOCUMENT_URL}${fileObj}`}
                        target="_blank"
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

            {/* Conditionally render buttons based on status */}
            {submission.status === "pending" ? (
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleOpenRejectDialog}
                >
                  Resubmit
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleOnApproveClick}
                >
                  Approve
                </Button>

                {/* Reject Dialog */}
                <Dialog
                  open={openRejectDialog}
                  onClose={handleCloseRejectDialog}
                >
                  <DialogTitle>Reject Submission - Reason?</DialogTitle>
                  <DialogContent>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseRejectDialog}
                      variant="contained"
                      color="inherit"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleRejectClick}
                      variant="contained"
                      color="error"
                    >
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            ) : (
              <Box sx={{ mt: 3 }}>
                Regret what you did?
              <Button variant="contained" color="primary" onClick={handleUndoClick} fullWidth>
                Undo
              </Button>
              </Box>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Submission;
