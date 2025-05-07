import React, { Component } from 'react';
import Navbar from '../components/navbar';
import ImageSlider from '../components/ImageSlider';
import Footer from '../components/Footer';
import HomeForm from './homeForm';

import './home.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const searchLocation = params.get('search') || '';
    this.setState({ location: searchLocation });
  }

  handleLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  render() {
    return (
      <div>
        <Navbar />

        {/* Hero Section with Banner and Form */}
        <div className="body">
          <div className="homebody">
            <div className="bannerbox position-relative">
              <ImageSlider />
              <div className="homeform-overlay position-absolute top-50 start-50 translate-middle w-100 px-3">
                <div className="container">
                  <HomeForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    );
  }
}

export default Index;
