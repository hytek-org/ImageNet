import React, { createContext, useState, useContext } from 'react';

const SavedImagesContext = createContext();

export const useSavedImages = () => useContext(SavedImagesContext);

export const SavedImagesProvider = ({ children }) => {
  const [savedImages, setSavedImages] = useState([]);

  const saveImage = (image) => {
    setSavedImages((prevImages) => [...prevImages, image]);
  };

  const deleteImage = (imageId) => {
    setSavedImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
  };

  return (
    <SavedImagesContext.Provider value={{ savedImages, saveImage, deleteImage }}>
      {children}
    </SavedImagesContext.Provider>
  );
};
