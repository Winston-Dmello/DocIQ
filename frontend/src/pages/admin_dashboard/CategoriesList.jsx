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
import { getCategories, createCategory, deleteCategory } from "./categoriesList";
import { useState, useEffect } from "react";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [category_name, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  const fetchCategories = async () => {
    const data = await getCategories();
    console.log(data);
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!category_name.trim()) {
      alert("Category name is required!");
      return;
    }

    const response = await createCategory({ category_name });
    console.log(response);
    alert(response.message);
    setCategoryName("");
    fetchCategories();
  };


  const handleDelete = async (categoryID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;
  
    try {
      await deleteCategory(categoryID); // Call API to delete category
      alert("Category deleted successfully!");
      fetchCategories(); // Refresh the list
    } catch (error) {
      alert("Failed to delete category. Try again.");
      console.error(error);
    }
  };
  

  const handleNext = () => {
    if ((page + 1) * itemsPerPage < categories.length) {
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
          Loading categories...
        </Typography>
      </Container>
    );
  }

  if (!categories) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" align="center" color="error">
          Failed to load Categories.
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
            Categories
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
                    Category Name
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
                {categories
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((category, index) => (
                    <TableRow key={category.category_id}>
                      <TableCell>{page * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{category.category_name}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDelete(category.category_id)}
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
                name="category_name"
                label="Category Name"
                onChange={(e) => setCategoryName(e.target.value)}
                required
                value={category_name || ""}
              />
              {/* Add Category Button */}
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
                onClick={fetchCategories}
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
                {page + 1} / {Math.ceil(categories.length / itemsPerPage) || 1}
              </Typography>

              <IconButton
                onClick={handleNext}
                disabled={(page + 1) * itemsPerPage >= categories.length}
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

export default CategoriesList;
