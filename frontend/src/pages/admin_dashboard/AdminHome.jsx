import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ArticleIcon from "@mui/icons-material/Article";
import { Link as RouterLink } from "react-router-dom";

const AdminHome = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminName = localStorage.getItem("admin_name");
    setAdmin(adminName);
  }, []);

  return (
    <Box sx={{ padding: 3, width: "100%", bgcolor: "background.default" }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          Welcome, {admin || "Admin"}!
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 2,
              borderTop: "4px solid",
              borderColor: "primary.main",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.light", width: 64, height: 64, mb: 2 }}
              >
                <AdminPanelSettingsIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ color: "text.primary" }}>
                Admin
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, color: "text.primary" }}
              >
                {admin || "IQAC Admin"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <RouterLink
                to="/admin/dashboard/generate-form"
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "action.selected",
                      cursor: "pointer",
                      transform: "translateY(-3px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      mb: 1.5,
                      width: 56,
                      height: 56,
                    }}
                  >
                    <NoteAddIcon fontSize="medium" />
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Create Form
                  </Typography>
                </Paper>
              </RouterLink>
            </Grid>
            <Grid item xs={12} sm={4}>
              <RouterLink
                to="/admin/dashboard/submissions"
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "action.selected",
                      cursor: "pointer",
                      transform: "translateY(-3px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      mb: 1.5,
                      width: 56,
                      height: 56,
                    }}
                  >
                    <AssignmentTurnedInIcon fontSize="medium" />
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Submissions
                  </Typography>
                </Paper>
              </RouterLink>
            </Grid>
            <Grid item xs={12} sm={4}>
              <RouterLink
                to="/admin/dashboard/documents"
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "action.selected",
                      cursor: "pointer",
                      transform: "translateY(-3px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      mb: 1.5,
                      width: 56,
                      height: 56,
                    }}
                  >
                    <ArticleIcon fontSize="medium" />
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Documents
                  </Typography>
                </Paper>
              </RouterLink>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminHome;
