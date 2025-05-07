import React, { Component } from 'react';
import Navbar from '../components/navbar';
import leftsideimage from '../icons/leftsingup.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      businessName: "",
      address: "",
      pincode:"",
      sinceFrom: "",
      specialistIn: "",
      contactPerson: "",
      contactNumber: "",
      email:"",
      website:"",
      pesticideLicence: "",
      gstNumber: "",
      membership: "",
      branchDetails: "",
      technicalQualification: "",
      password: "",
      cpassword: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      businessName, address, pincode, sinceFrom, specialistIn,
      contactPerson, contactNumber,email,website, pesticideLicence, gstNumber,
      membership, branchDetails, technicalQualification, password, cpassword
    } = this.state;

    if (!businessName || !password || !cpassword) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (password !== cpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload = {
      businessName, address, pincode, sinceFrom, specialistIn,
      contactPerson, contactNumber,email,website, pesticideLicence, gstNumber,
      membership, branchDetails, technicalQualification, password, cpassword
    };

    fetch(`${process.env.REACT_APP_API_URL}/VendorCreateAccount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          toast.success("Registration successful!");
          localStorage.setItem('vendorId', data.vendorId); // Important fix
          localStorage.setItem('loggedIn', true);
          setTimeout(() => window.location.href = "/Vendorview", 2000);
        } else {
          toast.error("Registration failed: " + data.message);
        }
      })
      .catch(() => toast.error("Error occurred during registration"));
  };
  render() {
    return (
      <div>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="container mt-4">
          <div className="row backgroundImagesignuppage">
            <div className="col-lg-6 d-none d-lg-block text-center mt-5">
              <h4 className="signupheader mb-4">🐜 Become a Verified Pest Control Partner</h4>
              <p className='text-left'>Join our network of trusted pest control professionals and grow your business with quality leads and easy job management.</p>
              <img src={leftsideimage} alt="signup" className="img-fluid" />
            </div>

         

          <div className="col-lg-6 col-md-12">
            <form onSubmit={this.handleSubmit} className="p-4 shadow rounded bg-white">
            <h3 className='mt-2 signup-title mb-2'>Provide Your Details to Register</h3>

              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-building" /></span>
                <input
                  name="businessName"
                  className="form-control"
                  placeholder="Business Name"
                  onChange={(e) => this.setState({ businessName: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-map-marker" /></span>
                <textarea
                  name="address"
                  className="form-control"
                  placeholder="Full Address "
                  onChange={(e) => this.setState({ address: e.target.value })}
                  required
                />
              </div>
             <div className='row'>
             <div className='col-sm-6'>
              <div className="mb-3 input-group ">
                <span className="input-group-text"><i className="	fa fa-location-arrow" /></span>
                <input
                  name="pincode"
                  className="form-control"
                  placeholder="Pincode
                  "
                  onChange={(e) => this.setState({ pincode: e.target.value })}
                />
              </div></div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group ">
                <span className="input-group-text"><i className="fa fa-calendar" /></span>
                <input
                  name="sinceFrom"
                  className="form-control"
                  placeholder="Since From (e.g., 2010)"
                  onChange={(e) => this.setState({ sinceFrom: e.target.value })}
                />
              </div></div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-star" /></span>
                <input
                  name="specialistIn"
                  className="form-control"
                  placeholder="Specialist In"
                  onChange={(e) => this.setState({ specialistIn: e.target.value })}
                />
              </div>  </div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-user-circle" /></span>
                <input
                  name="contactPerson"
                  className="form-control"
                  placeholder="Contact Person"
                  onChange={(e) => this.setState({ contactPerson: e.target.value })}
                />
              </div>  </div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-phone" /></span>
                <input
                  name="contactNumber"
                  className="form-control"
                  placeholder="Contact Number"
                  onChange={(e) => this.setState({ contactNumber: e.target.value })}
                />
              </div>  </div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-envelope-o" /></span>
                <input
                  name="email"
                  className="form-control"
                  placeholder="Email Id"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>  </div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-globe" /></span>
                <input
                  name="website"
                  className="form-control"
                  placeholder="Website"
                  onChange={(e) => this.setState({ website: e.target.value })}
                />
              </div>  </div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-id-card" /></span>
                <input
                  name="pesticideLicence"
                  className="form-control"
                  placeholder="Pesticide Licence"
                  onChange={(e) => this.setState({ pesticideLicence: e.target.value })}
                />
              </div>  </div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-file-invoice" /></span>
                <input
                  name="gstNumber"
                  className="form-control"
                  placeholder="GST Number"
                  onChange={(e) => this.setState({ gstNumber: e.target.value })}
                />
              </div></div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-users" /></span>
                <input
                  name="membership"
                  className="form-control"
                  placeholder="Membership of Association"
                  onChange={(e) => this.setState({ membership: e.target.value })}
                />
              </div></div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-map" /></span>
                <input
                  name="branchDetails"
                  className="form-control"
                  placeholder="Branch Details"
                  onChange={(e) => this.setState({ branchDetails: e.target.value })}
                />
              </div></div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-graduation-cap"></i></span>
                <input
                  name="technicalQualification"
                  className="form-control"
                  placeholder="Technical Qualification"
                  onChange={(e) => this.setState({ technicalQualification: e.target.value })}
                />
              </div></div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-lock" /></span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
              </div></div>
              <div className='col-sm-6'>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="fa fa-lock" /></span>
                <input
                  type="password"
                  name="cpassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => this.setState({ cpassword: e.target.value })}
                  required
                /></div>
              </div></div>

              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-primary">Create Account</button>
              </div>

              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


             
   
}
