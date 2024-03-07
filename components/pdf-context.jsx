import React, { createContext, useContext, useState } from "react";

const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [pdf, setPdf] = useState(null);

  return (
    <PdfContext.Provider value={{ pdf, setPdf }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdf = () => {
  const context = useContext(PdfContext);
  if (context === undefined) {
    throw new Error("usePdf must be used within a PdfProvider");
  }
  return context;
};
