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
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FormsList = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  async function fetchForms() {
    const response = await getforms();
    setForms(response);
    console.log(response);
  }

  useEffect(() => {
    fetchForms();
  }, []);

  const onButtonClick = (formID) => {
    navigate(`/user/dashboard/form/${formID}`);
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
                {forms.map((form, index) => {
                  return (
                    <TableRow key={form.form_id}>
                      <TableCell>{index + 1}</TableCell>
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default FormsList;
