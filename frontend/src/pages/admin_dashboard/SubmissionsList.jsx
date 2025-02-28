import { getsubmissions } from "./submissionsList";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"; // "<" icon
import NavigateNextIcon from "@mui/icons-material/NavigateNext"; // ">" icon
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    filterSubmissions(value, statusFilter);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    filterSubmissions(searchQuery, value);
  };

  const filterSubmissions = (search, status) => {
    let filtered = submissions;

    if (search) {
      filtered = filtered.filter((submission) =>
        submission.form_name.toLowerCase().includes(search)
      );
    }

    if (status !== "All") {
      filtered = filtered.filter((submission) => submission.status === status);
    }

    setFilteredSubmissions(filtered);
    setPage(0); // Reset to first page after filtering
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
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            Submissions
          </Typography>

          {/* Search and Filter Controls */}
          <Box sx={{ display: "flex", gap: 2 ,marginBottom: 2, justifyContent: "flex-end" }}>
            <TextField
              label="Search by Form Name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} onChange={handleStatusChange} label="Status">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="resubmit">Resubmit</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
                    Submission Status
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      fontWeight: "bold",
                    }}
                  >
                    Last Modified
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
            {/* Refresh Button */}
            <IconButton
              onClick={fetchSubmissions}
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
              {page + 1} / {Math.ceil(filteredSubmissions.length / itemsPerPage) || 1}
            </Typography>

            {/* Next Button */}
            <IconButton
              onClick={handleNext}
              disabled={(page + 1) * itemsPerPage >= filteredSubmissions.length}
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

export default SubmissionsList;
