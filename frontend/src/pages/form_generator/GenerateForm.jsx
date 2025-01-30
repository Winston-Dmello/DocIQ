import "./GenerateForm.css";
import { useState } from "react";

const GenerateForm = () => {
  const [formName, setFormName] = useState("");
  const [formDivisions, setFormDivisions] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [newField, setNewField] = useState({ label: "", type: "text" });

  const handleTitleChange = (e) => {
    setFormName(e.target.value);
  };

  const handleDivisionChange = (e) => {
    setFormDivisions([...e.target.selectedOptions].map((option) => option.value));
  };

  const addField = () => {
    if (newField.label) {
      setFormFields([...formFields, { id: Date.now(), ...newField }]);
      setNewField({ label: "", type: "text" });
    }
  };

  const removeField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  return (
    <div className="main-area">
      <div className="edit-column">
        <div className="make-form">
          <label htmlFor="form-name">Form Name : </label>
          <input type="text" placeholder="Form Name" onChange={handleTitleChange} id="form-name" />
        </div>
        <div className="make-form">
          <label htmlFor="form-division">Form Division : </label>
          <select multiple id="form-division" onChange={handleDivisionChange}>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div className="make-form">
          <label>Field Label:</label>
          <input
            type="text"
            placeholder="Field Label"
            value={newField.label}
            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          />
          <select
            value={newField.type}
            onChange={(e) => setNewField({ ...newField, type: e.target.value })}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
          </select>
          <button onClick={addField}>Add Field</button>
        </div>
        <div className="action">
          <button>Generate</button>
          <button onClick={() => setFormFields([])}>Delete</button>
        </div>
      </div>
      <div className="preview-column">
        <div className="form-name">{formName || "Form Preview"}</div>
        <form>
          {formFields.map((field) => (
            <div key={field.id} className="form-field">
              <label>{field.label}</label>
              <input type={field.type} />
              <button type="button" onClick={() => removeField(field.id)}>
                Remove
              </button>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default GenerateForm;
