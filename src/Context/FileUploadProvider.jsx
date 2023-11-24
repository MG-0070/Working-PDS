import React, { createContext, useState } from 'react';

const FileUploadContext = createContext();


const FileUploadProvider = (props) => {
  const [uploadedData, setUploadedData] = useState(null);

  return (
    <FileUploadContext.Provider value={{ uploadedData, setUploadedData }}>
      {props.children}
    </FileUploadContext.Provider>
  );
};

export default FileUploadProvider ;
