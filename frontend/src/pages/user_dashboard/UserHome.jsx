import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const UserHome = () => {
  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      {/* Row 1 */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        {/* Card 1 */}
        <Paper
          sx={{
            backgroundColor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            width: "30%",
            height: "35vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Department of Computer Science
          </Typography>
        </Paper>

        {/* Card 2 */}
        <Paper
          sx={{
            backgroundColor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            width: "70%",
            height: "35vh",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Pending
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Submission Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Extra Curriculars</TableCell>
                  <TableCell>20/01/2025</TableCell>
                  <TableCell>24/01/2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lab Report</TableCell>
                  <TableCell>20/01/2025</TableCell>
                  <TableCell>24/01/2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Student Achievements</TableCell>
                  <TableCell>20/01/2025</TableCell>
                  <TableCell>24/01/2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Row 2 */}
      <Box>
        {/* Card 3 */}
        <Paper
          sx={{
            backgroundColor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            width: "100%",
            height: "35vh",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    File Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Signed By
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Staff Info</TableCell>
                  <TableCell>20/01/2025</TableCell>
                  <TableCell>HOD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Student Performance</TableCell>
                  <TableCell>15/01/2025</TableCell>
                  <TableCell>Document Head</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Exam Report</TableCell>
                  <TableCell>12/01/2025</TableCell>
                  <TableCell>HOD</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserHome;
