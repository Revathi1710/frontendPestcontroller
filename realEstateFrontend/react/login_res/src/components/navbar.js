import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const [userName, setUserName] = useState('');
  const [isVendor, setIsVendor] = useState(false); // to control UI conditionally
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('UserId');
        const vendorId = localStorage.getItem('vendorId');
        if (!userId && !vendorId) return;
    
        setIsVendor(!!vendorId); // true if vendorId exists
    
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getName`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, vendorId }),
        });
    
        const result = await response.json();
        
        if (result.status === 'ok') {
          const name = result.data?.contactPerson || result.data?.name;
          if (name) setUserName(name);
        }
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    };
    

    fetchUserName();
  }, []);

  return (
    <header className="bg-white shadow-sm px-3 py-3 d-flex justify-content-between align-items-center flex-wrap">
      {/* Logo */}
      <div className="d-flex align-items-center">
        <h1 className="logonameheader mb-0">
          <Link to="/">Post Controller Near Me</Link>
        </h1>
      </div>

      {/* User Actions */}
      <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
        {userName ? (
          <div
            className="position-relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="btn postbtn">{userName}</button>
            {showDropdown && (
              <div className="dropdown-menu-custom">
                {isVendor && (
                  <Link to="/Vendorview" className="dropdown-item-custom">Edit Profile</Link>
                )}
                <Link to="/logout" className="dropdown-item-custom">Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/Signup" className="login-icon">
            <button className="btn postbtn">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
