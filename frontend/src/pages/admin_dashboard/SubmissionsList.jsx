import { getsubmissions, searchsubmissions } from "./submissionsList";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Box,
  TextField,
  Grid,
  Button,
  Modal,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    const data = await getsubmissions();
    setSubmissions(data);
    setFilteredSubmissions(data);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const onButtonClick = (submissionID) => {
    navigate(`/admin/dashboard/submissions/${submissionID}`);
  };

  const handleNext = () => {
    if ((page + 1) * itemsPerPage < filteredSubmissions.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await searchsubmissions(searchQuery);
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <Container maxWidth>
      <Card
        sx={{
          height: "95%",
          padding: 6,
          overflowY: "auto",
          position: "relative",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography
              variant="h4"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              Submissions
            </Typography>

            <IconButton onClick={() => setSearchBoxOpen(true)}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Table */}
          <TableContainer sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {["Serial Number", "Form Name", "Submission Status", "Last Modified", "Actions"].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "text.secondary",
                        fontWeight: "bold",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "background.default" }}>
                {filteredSubmissions
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((submission, index) => (
                    <TableRow key={submission.submission_id}>
                      <TableCell>{page * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{submission.form_name}</TableCell>
                      <TableCell>{submission.status}</TableCell>
                      <TableCell>{submission.updatedAt}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            onButtonClick(submission.submission_id)
                          }
                        >
                          <VisibilityIcon />
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
            <IconButton onClick={fetchSubmissions}>
              <RefreshIcon />
            </IconButton>
            <IconButton onClick={handlePrev} disabled={page === 0}>
              <NavigateBeforeIcon />
            </IconButton>
            <Typography sx={{ marginX: 1 }}>
              {page + 1} / {Math.ceil(filteredSubmissions.length / itemsPerPage) || 1}
            </Typography>
            <IconButton
              onClick={handleNext}
              disabled={(page + 1) * itemsPerPage >= filteredSubmissions.length}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Centered Search Modal */}
      <Modal open={searchBoxOpen} onClose={() => setSearchBoxOpen(false)}>
        <Box
          sx={{
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 3,
            p: 4,
            boxShadow: 24,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Search Submissions</Typography>
            <IconButton onClick={() => setSearchBoxOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Search by Form Name"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>
          {/* Results */}
      {searchResults.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" mb={2}>
            Search Results
          </Typography>
          <Grid container spacing={2}>
            {searchResults.map((submission) => (
              <Grid item xs={12} sm={6} md={4} key={submission.submission_id}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {submission.form_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {submission.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Updated: {submission.updatedAt}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() =>
                        onButtonClick(submission.submission_id)
                      }
                      sx={{ mt: 1 }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
        </Box>
      </Modal>

      
    </Container>
  );
};

export default SubmissionsList;
