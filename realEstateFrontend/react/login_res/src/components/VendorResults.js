import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import pest2 from '../icons/pest2.jpg';
import "./VendorResult.css"; // optional custom CSS for enhancements
import { FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaStar, FaLocationArrow, FaMap } from "react-icons/fa";
import { BsWhatsapp, BsPencil, BsShare } from "react-icons/bs";
const VendorResults = () => {
  const { state } = useLocation();
  const vendors = state?.vendors || [];
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bodyvendorresult">
        <div className="container py-5">
        <div className="backbtn ">
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
                    {/* Placeholder Image Column */}
                    <div className="col-md-3 text-center ">
                      {vendor.image?.length > 0 ? (
                        <div id={`carousel-${vendor._id}`} className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-inner">
                            {vendor.image.map((img, i) => (
                              <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
                                <img
                                  src={`${process.env.REACT_APP_API_URL}/uploads/${img.replace("\\", "/")}`}
                                  className="d-block w-100 rounded-start p-2 resultImages" 
                                  alt={`Slide ${i}`}
                                
                                />
                              </div>
                            ))}
                          </div>
                          {vendor.image.length > 1 && (
                            <>
                              <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${vendor._id}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                              </button>
                              <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${vendor._id}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <img
                          src="/default.jpg" // Ensure this image is correctly placed in the public folder or adjust the path
                          className="img-fluid rounded-start p-2"
                          alt="No Image"
                        
                        />
                      )}
                    </div>

                    {/* Vendor Info Column */}
                    <div className="col-md-9">
                      <div className="card-body">
                      <h5 className=" card-title text-primary mb-4">
  <Link to={`/pestcontrolOwner/${vendor.businessSlug}`} className="resultcompanyName">
    {vendor.businessName}
  </Link>
</h5>

                       
                        <p className="mb-3 addressresult"><strong> <FaMapMarkerAlt /></strong> {vendor.address}</p>
                     
                      
                        <p className="mb-2">
  {vendor.logo && vendor.logo.length > 1 ? (
    <>
     
      <img
        src={`${process.env.REACT_APP_API_URL}/uploads/${vendor.logo.replace("\\", "/")}`}
        alt="Vendor Logo" className="logoresult"
        width={100}
      />
    </>
  ) : (
    <img
      src="/default.jpg" // Ensure this image is correctly placed in the public folder or adjust the path
      className="img-fluid rounded-start p-2"
      alt="No Image"
    />
  )}
</p> 
<div className="mb-3">

<p className="ellipsis-2-lines mb-1">{vendor.aboutUs}</p>
<Link
  to={`/pestcontrolOwner/${vendor.businessSlug}`}
  className="text-primary text-decoration-none"
>
  More Details →
</Link></div>



<div className="d-flex flex-wrap gap-2 mt-4 mt-md-0">

                             
                               <Link 
  to={`/pestcontrolOwner/${vendor.businessSlug}`}
  className="btn btn-primary"
>
<FaPhoneAlt /> Contact Now
</Link>
                              
                             
                             {/*  <button className="btn btn-primary">Enquire Now</button>*/}
                             
                              <a
                               href={`https://wa.me/${vendor.contactNumber}?text=${encodeURIComponent(
                                 "Hi, I am interested in your services."
                               )}`}
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
