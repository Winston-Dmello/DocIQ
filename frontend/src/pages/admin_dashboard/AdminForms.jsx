import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"; // "<" icon
import NavigateNextIcon from "@mui/icons-material/NavigateNext"; // ">" icon
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getforms } from "./adminForms";
// import { useNavigate } from "react-router-dom";

const AdminForms = () => {
  const [forms, setForms] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  async function fetchForms() {
    const response = await getforms();
    setForms(response);
    console.log(response);
  }

  useEffect(() => {
    fetchForms();
  }, []);

  const handleOpen = (recipients) => {
    setSelectedRecipients(recipients);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    if ((page + 1) * itemsPerPage < forms.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleEditButton = (formID) => {
    navigate(`/admin/dashboard/forms/edit/${formID}`);
  }

  const handleViewButton = (formID) => {
    navigate(`/admin/dashboard/forms/${formID}`);
  }

  return (
    <Container maxWidth sx={{ overflowY: "scroll" }}>
      <Card sx={{ height: "95%", padding: 6 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            Forms
          </Typography>
          <TableContainer sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Serial Number
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Form Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Recipients
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Submission Type
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "background.default" }}>
                {forms
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((form, index) => (
                  <TableRow key={index}>
                    <TableCell>{page * itemsPerPage + index + 1}</TableCell>
                    <TableCell>{form.form_name}</TableCell>
                    <TableCell>{form.category}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          handleOpen(form.recipients.map((user) => user.email))
                        }
                      >
                        {form.recipients
                          .map((user) => user.email)
                          .slice(0, 1)
                          .join(", ")}
                        {form.recipients.length > 1 && "..."}
                      </Button>
                    </TableCell>
                    <TableCell>{form.submission_type}</TableCell>
                    <TableCell>
                        <IconButton
                        onClick={() => handleEditButton(form.form_id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                        onClick={() => handleViewButton(form.form_id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Recipients
              </Typography>
              <Typography>{selectedRecipients.join(", ")}</Typography>
              <Button onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Modal>
          {/* Pagination & Refresh Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            {/* Refresh Button */}
            <IconButton
              onClick={fetchForms}
              sx={{ color: "text.primary" }}
            >
              <RefreshIcon />
            </IconButton>

            {/* Previous Button */}
            <IconButton
              onClick={handlePrev}
              disabled={page === 0}
              sx={{ color: "text.primary" }}
            >
              <NavigateBeforeIcon />
            </IconButton>

            {/* Page Indicator */}
            <Typography sx={{ marginX: 1, color: "text.primary" }}>
              {page + 1} / {Math.ceil(forms.length / itemsPerPage) || 1}
            </Typography>

            {/* Next Button */}
            <IconButton
              onClick={handleNext}
              disabled={(page + 1) * itemsPerPage >= forms.length}
              sx={{ color: "text.primary" }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminForms;
