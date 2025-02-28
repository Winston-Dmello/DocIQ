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
    Button,
    CardContent,
  }  from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SubmissionsList = () => {

    const [submissions, setSubmissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubmissions = async () => {
            const data = await getsubmissions();
            console.log(data);
            setSubmissions(data);
        };
        fetchSubmissions();
    }, []);
    
    const onButtonClick = (submissionID) => {
      console.log(submissionID);
      navigate(`/user/dashboard/submission/${submissionID}`);
    };


    return (
        <Container maxWidth>
      <Card sx={{height: "95%", padding: 6, overflowY: "auto"}}>
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
              <TableBody sx={{ backgroundColor: "background.default", overflowY: "auto" }}>
                {submissions.map((submission, index) => {
                  return (
                    <TableRow key={submission.submission_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{submission.form_name}</TableCell>
                      <TableCell>{submission.status}</TableCell>
                      <TableCell>{submission.updatedAt}</TableCell>
                      <TableCell>
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                        onClick={() => onButtonClick(submission.submission_id)}
                        >
                            <VisibilityIcon/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
    )
}

export default SubmissionsList;