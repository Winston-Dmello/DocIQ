import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DownloadIcon from "@mui/icons-material/Download";

import { useState, useEffect } from "react";
import { getDocuments } from "./documentsList";

const DocumentsList = () => {
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  // Search and filter states
  const [fileName, setFileName] = useState("");
  const [formName, setFormName] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");

  const fetchDocuments = async () => {
    const data = await getDocuments();
    setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Apply filters
  const filteredDocuments = documents.filter((document) => {
    return (
      (fileName === "" ||
        document.file_name.toLowerCase().includes(fileName.toLowerCase())) &&
      (formName === "" ||
        document.form_name.toLowerCase().includes(formName.toLowerCase())) &&
      (divisionName === "" || document.division_name === divisionName) &&
      (submittedBy === "" || document.user_name === submittedBy)
    );
  });

  const handleNext = () => {
    if ((page + 1) * itemsPerPage < filteredDocuments.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

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
            Documents
          </Typography>

          {/* Search and Filter Fields */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <TextField
              label="Search File Name"
              variant="outlined"
              fullWidth
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <TextField
              label="Search Form Name"
              variant="outlined"
              fullWidth
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel>Submitted By</InputLabel>
              <Select
                label="Submitted By"
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {[...new Set(documents.map((doc) => doc.user_name))].map(
                  (user) => (
                    <MenuItem key={user} value={user}>
                      {user}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Division Name</InputLabel>
              <Select
                label="Division Name"
                value={divisionName}
                onChange={(e) => setDivisionName(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {[...new Set(documents.map((doc) => doc.division_name))].map(
                  (division) => (
                    <MenuItem key={division} value={division}>
                      {division}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          {/* Table */}
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
                    File Name
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
                    Submitted By
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Division Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Date
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
                {filteredDocuments
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((document, index) => (
                    <TableRow key={document.document_id}>
                      <TableCell>{page * itemsPerPage + index + 1}</TableCell>
                      <TableCell>
                        {document.file_name.split("$$$")[1]}
                      </TableCell>
                      <TableCell>{document.form_name}</TableCell>
                      <TableCell>{document.user_name}</TableCell>
                      <TableCell>{document.division_name}</TableCell>
                      <TableCell>{document.date}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            window.open(
                              `${import.meta.env.VITE_BASE_DOCUMENT_URL}${document.file_path}`,
                              "_blank"
                            )
                          }
                        >
                          <DownloadIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
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
            <IconButton onClick={fetchDocuments} sx={{ color: "text.primary" }}>
              <RefreshIcon />
            </IconButton>
            <IconButton
              onClick={handlePrev}
              disabled={page === 0}
              sx={{ color: "text.primary" }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <Typography sx={{ marginX: 1, color: "text.primary" }}>
              {page + 1} /{" "}
              {Math.ceil(filteredDocuments.length / itemsPerPage) || 1}
            </Typography>
            <IconButton
              onClick={handleNext}
              disabled={(page + 1) * itemsPerPage >= filteredDocuments.length}
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

export default DocumentsList;
