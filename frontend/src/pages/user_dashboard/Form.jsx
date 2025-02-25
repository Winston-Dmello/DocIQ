import { Container } from "@mui/material";
import getform from "./form";
import { useEffect, useState } from "react";

const Forms = () => {
    const [form, setForm] = useState({});

    async function fetchForms() {
        const response = await getform();
        setForm(response);
        console.log(response);
    }

    useEffect(() => {
        fetchForms();    
    }, [])


    return (
        <Container>
            <h1>{form.form_name}</h1>
            <form>
                {form.form_data.map((field, index) => (
                    <div key={index}>
                        <label>{field.name}</label>
                        <input type={field.type} name={field.name} />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </Container>
    )
}

export default Forms;