import React, { useState, useEffect } from 'react';

const ProfilePicture = () => {
  const [pictures, setPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

  // Fetch pictures from backend on component mount
  useEffect(() => {
    fetchPicturesFromBackend();
  }, []);

  const fetchPicturesFromBackend = async () => {
    try {
      // Fetch pre-set SVG files from backend
      const response = await fetch('/api/profile-pictures'); // Adjust API endpoint as needed
      const data = await response.json();
      setPictures(data);
    } catch (error) {
      console.error('Error fetching profile pictures:', error);
    }
  };

  const handlePictureSelection = (picture) => {
    setSelectedPicture(picture);
  };

  return (
    <div>
      <h2>Select Profile Picture</h2>
      <div className="picture-container">
        {pictures.map((picture, index) => (
          <img
            key={index}
            src={picture.url} // Assuming 'url' is the key for image URLs in your data
            alt={`Profile Picture ${index}`}
            className={selectedPicture === picture ? 'selected' : ''}
            onClick={() => handlePictureSelection(picture)}
          />
        ))}
      </div>
      {selectedPicture && (
        <div>
          <h3>Selected Profile Picture</h3>
          <img src={selectedPicture.url} alt="Selected Profile" />
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
