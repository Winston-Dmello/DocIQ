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
} from "@mui/material";

import {useState, useEffect} from "react";

const FormsList = () => {

    const [forms, setForms] = useState({});

    async function fetchForms() {
        const response = await getforms();
        setForms(response);
        console.log(response);
    }

    useEffect(() => {
        fetchForms();    
    }, [])



  return (
    <Container maxWidth sx={{ overflowY: "scroll" }}>
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
          <TableBody sx={{ backgroundColor: "background.default" }}>
            {forms.map((form, index) => {
                return(
                    <TableRow key={form.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{form.form_name}</TableCell>
                        <TableCell>{form.form_status}</TableCell>
                        <TableCell><Button>Edit</Button></TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      
    </Container>
  );
};

export default FormsList;
