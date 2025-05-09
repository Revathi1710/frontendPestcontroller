import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import noImage from '../icons/noImage.jpg';
import "./VendorResult.css";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

const VendorResults = () => {
  const { state } = useLocation();
  const vendors = state?.vendors || [];
  const navigate = useNavigate();

  // 🔵 This function is called when the user clicks "Contact Now"
  const handleVendorClick = async (vendorId) => {
    const userId = localStorage.getItem("UserId"); // Get userId from localStorage

    // ✅ Check if both values are available
    if (!userId || !vendorId) {
      alert("User ID or Vendor ID is missing.");
      return;
    }

    try {
      // ✅ Send userId and vendorId to backend API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/enquiry-click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ vendorId, userId })
      });

      if (response.ok) {
        console.log("Click stored successfully.");
      } else {
        console.error("Failed to store the click.");
      }
    } catch (error) {
      console.error("Error storing click:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bodyvendorresult">
        <div className="container py-5">
          <div className="backbtn">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Back to Search
            </button>
          </div>
          <h2 className="text-center mb-4">Verified Vendor Listings</h2>

          {vendors.length > 0 ? (
            <div className="vendor-list">
              {vendors.map((vendor) => (
                <div key={vendor._id} className="card mb-4 shadow-sm border-0 rounded-4">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-3 text-center">
                      {vendor.image?.length > 0 ? (
                        <img
                          src={`${process.env.REACT_APP_API_URL}/uploads/${vendor.image[0].replace("\\", "/")}`}
                          className="d-block w-100 rounded-start p-2 resultImages"
                          alt="Vendor"
                        />
                      ) : (
                        <img
                          src={noImage}
                          className="img-fluid rounded-start p-2"
                          alt="No Image"
                        />
                      )}
                    </div>

                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title text-primary mb-4">
                          <Link to={`/pestcontrolOwner/${vendor.businessSlug}`} className="resultcompanyName"  onClick={() => handleVendorClick(vendor._id)}>
                            {vendor.businessName}
                          </Link>
                        </h5>

                        <p className="mb-3 addressresult">
                          <strong><FaMapMarkerAlt /></strong> {vendor.address}
                        </p>
                        <p className="mb-2">
  {vendor.logo && vendor.logo.trim().length > 1 ? (
    <img
      src={`${process.env.REACT_APP_API_URL}/uploads/${vendor.logo.replace("\\", "/")}`}
      alt="Vendor Logo"
      className="logoresult"
      width={100}
    />
  ) : null} {/* This will show nothing if there is no logo */}
</p>

                        <div className="mb-3">
                          <p className="ellipsis-2-lines mb-1">{vendor.aboutUs}</p>
                          <Link to={`/pestcontrolOwner/${vendor.businessSlug}`} className="text-primary text-decoration-none"  onClick={() => handleVendorClick(vendor._id)}>
                            More Details →
                          </Link>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mt-4">
                          {/* 🔵 Contact Now: send userId + vendorId to backend */}
                          <Link
                            to={`/pestcontrolOwner/${vendor.businessSlug}`}
                            className="btn btn-primary"
                            onClick={() => handleVendorClick(vendor._id)}
                          >
                            <FaPhoneAlt /> Contact Now
                          </Link>

                          {/* WhatsApp Button */}
                          <a
                            href={`https://wa.me/${vendor.contactNumber}?text=${encodeURIComponent("Hi, I am interested in your services.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success"
                          >
                            <BsWhatsapp /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted">No vendors found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorResults;
