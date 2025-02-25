import { Button, Container, Input } from "@mui/material";
import {getform} from "./form";
import { useEffect, useState } from "react";

const Forms = () => {
    const [form, setForm] = useState({});
    const [formdata, setFormData] = useState([]);
    const [file, setFile] = useState([]);

    async function fetchForms() {
        const response = await getform();
        setForm(response);
        setFormData(response.form_data);
    }

    const onSubmit = (e) => {
        e.preventDefault();

    }

    useEffect(() => {
        fetchForms();    
    }, [])



    return (
        <Container>
            <h3>{form.form_name}</h3>
            <form>
                {formdata.map((field, index) => (
                    <div key={index}>
                        <label>{field.name}</label><br/>
                        <Input varient="filled" type={field.type} name={field.name} required />
                    </div>
                ))}
                <Input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                <br /><br />
                <Button type="submit" onClick={onSubmit}>Submit</Button>
            </form>
        </Container>
    )
}

export default Forms;