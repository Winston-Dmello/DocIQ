import { getforms } from "./formsList";

import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Card,
  Box,
  IconButton,
  CardContent,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"; // "<" icon
import NavigateNextIcon from "@mui/icons-material/NavigateNext"; // ">" icon
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FormsList = () => {
  const [forms, setForms] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  async function fetchForms() {
    const response = await getforms();
    setForms(response);
  }

  useEffect(() => {
    fetchForms();
  }, []);

  const onButtonClick = (formID) => {
    navigate(`/user/dashboard/form/${formID}`);
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

  return (
    <Container maxWidth>
      <Card sx={{height: "95%", padding: 6}}>
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
                    Form Status
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "background.default", overflowY: "auto" }}>
                {forms
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((form, index) => {
                  return (
                    <TableRow key={form.form_id}>
                      <TableCell>{page * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{form.form_name}</TableCell>
                      <TableCell>{form.status}</TableCell>
                      <TableCell>
                        <Button onClick={() => onButtonClick(form.form_id)}>Fill</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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

export default FormsList;
