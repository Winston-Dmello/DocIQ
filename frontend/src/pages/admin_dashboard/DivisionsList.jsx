import {
    Typography,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Card,
    CardContent,
    IconButton,
    Box,
  } from "@mui/material";
  
  import DeleteIcon from "@mui/icons-material/Delete";
  import AddIcon from "@mui/icons-material/Add";
  import RefreshIcon from "@mui/icons-material/Refresh";
  import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import { getDivisions, createDivision, deleteDivision } from "./divisionsList";
  import { useState, useEffect } from "react";
  import SnackbarService from "../../utils/SnackbarService";
  
  const DivisionsList = () => {
    const [divisions, setDivisions] = useState([]);
    const [page, setPage] = useState(0);
    const [division_name, setDivisionName] = useState("");
    const [loading, setLoading] = useState(true);
  
    const itemsPerPage = 5;
  
    const fetchDivisions = async () => {
      const data = await getDivisions();
      console.log(data);
      setDivisions(data);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchDivisions();
    }, []);
  
    const handleAdd = async (e) => {
      e.preventDefault();
      if (!division_name.trim()) {
        SnackbarService.showSnackbar("Division name is required!", {severity: "warning"});
        return;
      }
  
      const response = await createDivision({ division_name });
      SnackbarService.showSnackbar(response.message);
      setDivisionName("");
      fetchDivisions();
    };
  
    const handleDelete = async (divisionID) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this division?");
      if (!confirmDelete) return;
  
      try {
        await deleteDivision(divisionID);
        SnackbarService.showSnackbar("Division deleted successfully!", {severity: "success"});
        fetchDivisions();
      } catch (error) {
        SnackbarService.showSnackbar("Failed to delete division. Try again.", {severity: "error"});
        console.error(error);
      }
    };
  
    const handleNext = () => {
      if ((page + 1) * itemsPerPage < divisions.length) {
        setPage(page + 1);
      }
    };
  
    const handlePrev = () => {
      if (page > 0) {
        setPage(page - 1);
      }
    };
  
    if (loading) {
      return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Typography variant="h6" align="center">
            Loading divisions...
          </Typography>
        </Container>
      );
    }
  
    if (!divisions) {
      return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Typography variant="h6" align="center" color="error">
            Failed to load Divisions.
          </Typography>
        </Container>
      );
    }
  
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
              Divisions
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
                      Division Name
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
                  {divisions
                    .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                    .map((division, index) => (
                      <TableRow key={division.division_id}>
                        <TableCell>{page * itemsPerPage + index + 1}</TableCell>
                        <TableCell>{division.division_name}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleDelete(division.division_id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
  
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="division_name"
                  label="Division Name"
                  onChange={(e) => setDivisionName(e.target.value)}
                  required
                  value={division_name || ""}
                />
                {/* Add Division Button */}
                <IconButton
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                    margin: 1,
                  }}
                  onClick={handleAdd}
                >
                  <AddIcon />
                </IconButton>
              </Box>
  
              {/* Pagination & Refresh Controls */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={fetchDivisions}
                  sx={{ color: "text.primary" }}
                >
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
                  {page + 1} / {Math.ceil(divisions.length / itemsPerPage) || 1}
                </Typography>
  
                <IconButton
                  onClick={handleNext}
                  disabled={(page + 1) * itemsPerPage >= divisions.length}
                  sx={{ color: "text.primary" }}
                >
                  <NavigateNextIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  };
  
  export default DivisionsList;
  