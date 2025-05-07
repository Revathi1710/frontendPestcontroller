import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeForm = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", state: "", pincode: "", number: "", businessType: "Residential"
  });

  const [errors, setErrors] = useState({});
  const [existingUser, setExistingUser] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits.";
    if (!/^\d{10}$/.test(formData.number)) newErrors.number = "Number must be 10 digits.";
    return newErrors;
  };

  const handleEmailBlur = async () => {
    if (!formData.email) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/checkUserByEmail?email=${formData.email}`);
      const result = await response.json();

      if (response.ok && result.user) {
        const confirmFill = window.confirm("This email already exists. Do you want to fill the form with existing data?");
        if (confirmFill) {
          setFormData({
            name: result.user.name || "",
            email: result.user.email,
            state: result.user.state || "",
            pincode: result.user.pincode || "",
            number: result.user.number || "",
            businessType: result.user.businessType || "Residential"
          });
          setExistingUser(true);
        }
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/VSearchBuyer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, skipUserSave: existingUser }),
      });
  
      const result = await response.json();
      if (response.ok) {
        // Store UserId in localStorage if response is successful
        if (result.userId) {
          localStorage.setItem('UserId', result.userId);  // Store the UserId
        }
  
        navigate("/vendors", { state: { vendors: result.vendors || [] } });
      } else {
        alert(result.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4 px-4 py-5">
        <h3 className="text-center mb-4 text-primary fw-bold">Get Matched With Pest Control Vendors</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">👤 Name</label>
              <input type="text" name="name" className={`form-control ${errors.name && "is-invalid"}`} value={formData.name} onChange={handleChange} />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">📧 Email</label>
              <input type="email" name="email" className={`form-control ${errors.email && "is-invalid"}`} value={formData.email} onChange={handleChange} onBlur={handleEmailBlur} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">🌐 State</label>
              <input type="text" name="state" className={`form-control ${errors.state && "is-invalid"}`} value={formData.state} onChange={handleChange} />
              {errors.state && <div className="invalid-feedback">{errors.state}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">📮 Pincode</label>
              <input type="text" name="pincode" className={`form-control ${errors.pincode && "is-invalid"}`} value={formData.pincode} onChange={handleChange} />
              {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">📞 Contact Number</label>
              <input type="text" name="number" className={`form-control ${errors.number && "is-invalid"}`} value={formData.number} onChange={handleChange} />
              {errors.number && <div className="invalid-feedback">{errors.number}</div>}
            </div>
            

            <div className="col-md-6">
              <label className="form-label">🏢 Business Type</label>
              <div className="d-flex gap-4 mt-2">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="businessType" value="Residential" checked={formData.businessType === 'Residential'} onChange={handleChange} />
                  <label className="form-check-label">Residential</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="businessType" value="Commercial" checked={formData.businessType === 'Commercial'} onChange={handleChange} />
                  <label className="form-check-label">Commercial</label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-100 py-2 fs-5 rounded-pill">🔍 Find Vendors</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeForm;
