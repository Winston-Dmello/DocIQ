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
    Button,
    Card,
    CardContent,
  }  from '@mui/material/Container';

import { useState, useEffect } from "react";

const SubmissionsList = () => {

    const [submissions, setSubmissions] = useState([]);

    const fetchSubmissions = () => {
        const data = getsubmissions();
        setSubmissions(data);
    }

    useEffect(() => {
        fetchSubmissions();
    }, []);

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
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "background.default", overflowY: "auto" }}>
                {submissions.map((submission, index) => {
                  return (
                    <TableRow key={submission.submission_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{submission.submission_name}</TableCell>
                      <TableCell>{submission.status}</TableCell>
                      <TableCell>
                        <Button onClick={() => onButtonClick(submission.submission_id)}>Fill</Button>
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