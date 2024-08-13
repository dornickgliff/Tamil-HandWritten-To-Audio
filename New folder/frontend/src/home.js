import React, { useState } from 'react';
import './css/home.css';

const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="home-page-container">
      <h1>Home Page</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div className="image-preview">
          <h2>Selected Image:</h2>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
