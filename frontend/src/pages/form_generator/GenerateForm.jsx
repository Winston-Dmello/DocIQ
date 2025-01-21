import { useState, useEffect } from "react";
import { initializeFields } from "./generateForm";

const GenerateForm = () => {
  const [fields, setFields] = useState({});
  const [additionalFields, setAdditionalFields] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [popupData, setPopupData] = useState({ name: "", type: "text" });

  // Initialize default fields on mount
  useEffect(() => {
    const defaultFields = initializeFields();
    setFields(defaultFields);
  }, []);

  const openPopup = (field = null) => {
    setEditingField(field);
    setPopupData(field || { name: "", type: "text" });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupData({ name: "", type: "text" });
  };

  const handleSaveField = () => {
    if (editingField) {
      setAdditionalFields((prev) =>
        prev.map((f) => (f === editingField ? popupData : f)),
      );
    } else {
      setAdditionalFields((prev) => [...prev, popupData]);
    }
    closePopup();
  };

  const handleSubmit = () => {
    const formData = {
      default: fields,
      additional: additionalFields,
    };
    console.log("Generated Form Data:", formData);
    alert("Form submitted! Check the console for output.");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Form Generator</h1>

      <form className="mt-4">
        <h2>Default Fields</h2>
        <div className="row align-items-center">
          {Object.entries(fields).map(([key, value]) => (
            <div className="col-md-6 mb-3 " key={key}>
              <label htmlFor={key} className="form-label">
                {key}
              </label>
              <input
                type={value}
                className="form-control"
                name={key}
                id={key}
                disabled
              />
            </div>
          ))}
        </div>

        <h2 className="mt-4">Additional Fields</h2>
        <div className="row">
          {additionalFields.map((field, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="d-flex align-items-center">
                <span className="me-2">
                  {field.name} ({field.type})
                </span>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => openPopup(field)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => openPopup()}
        >
          Add Field
        </button>
      </form>

      {/* Submit Button */}
      <button className="btn btn-primary mt-4" onClick={handleSubmit}>
        Submit Form
      </button>

      {/* Popup Component */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content p-4 bg-white rounded shadow">
            <h3>{editingField ? "Edit Field" : "Add Field"}</h3>
            <div className="mb-3">
              <label className="form-label">Field Name:</label>
              <input
                type="text"
                className="form-control"
                value={popupData.name}
                onChange={(e) =>
                  setPopupData({ ...popupData, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Field Type:</label>
              <select
                className="form-select"
                value={popupData.type}
                onChange={(e) =>
                  setPopupData({ ...popupData, type: e.target.value })
                }
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="date">Date</option>
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={handleSaveField}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateForm;
