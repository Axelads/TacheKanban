import React, { createContext, useContext, useState } from 'react';

// Contexte pour les sous-catégories
const SubcategoryContext = createContext();

export const SubcategoryProvider = ({ children }) => {
  const [subcategories, setSubcategories] = useState([]);

  const addSubcategory = (subcategory) => {
    setSubcategories((prev) => [...prev, { id: Date.now(), ...subcategory }]);
  };

  return (
    <SubcategoryContext.Provider value={{ subcategories, addSubcategory }}>
      {children}
    </SubcategoryContext.Provider>
  );
};

export const useSubcategory = () => {
  const context = useContext(SubcategoryContext);
  if (!context) {
    throw new Error('useSubcategory must be used within a SubcategoryProvider');
  }
  return context;
};
