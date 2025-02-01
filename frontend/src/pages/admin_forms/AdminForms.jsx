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
  } from "@mui/material";
  import { useState } from "react";
import { getforms } from "./adminForms";
import { useEffect } from "react";
  
  const AdminForms = () => {
    const [forms, setForms] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
  
    async function fetchForms() {
        const response = await getforms();
        setForms(response);
        console.log(response);
    }

    useEffect(() => {
        fetchForms();    
    }, [])
    
  
    const handleOpen = (recipients) => {
      setSelectedRecipients(recipients);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <Container maxWidth sx={{overflowY: "scroll" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          Forms
        </Typography>
        <TableContainer sx={{borderRadius: 2}}>
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
              </TableRow>
            </TableHead>
            <TableBody sx={{backgroundColor: "background.default"}}>
              {forms.map((form, index) => (
                <TableRow key={form.id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{form.form_name}</TableCell>
                  <TableCell>{form.category}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(form.recipients.map(user => user.email))}>
                      {form.recipients.map((user) => user.email).slice(0, 2).join(", ")}
                      {form.recipients.length > 2 && "..."}
                    </Button>
                  </TableCell>
                  <TableCell>{form.submission_type}</TableCell>
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
            <Typography>
              {selectedRecipients.join(", ")}
            </Typography>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
      </Container>
    );
  };
  
  export default AdminForms;