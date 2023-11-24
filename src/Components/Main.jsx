import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WarehouseCard from './WarehouseCard';
import FpsCard from './FpsCard';
import Graph from './Graph';
import Map from './Map';
import QrmChat from './QrmChat';
import * as XLSX from 'xlsx';

function Main() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [count, setCount] = useState(null);
  const defaultFileName = 'Data_1.xlsx';
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      alert('Please select an Excel file (XLSX format).');
      event.target.value = null;
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('uploadFile', file, defaultFileName); // Set the file name as 'Data_1.xlsx'

    try {
      const response = await axios.post('http://localhost:5000/uploadConfigExcel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 1) {
        setUploadStatus('File uploaded successfully');
        // Handle further logic if needed upon successful upload
      } else {
        setUploadStatus(response.data.message || 'Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file');
    }

    // Place the file reading code inside the handleUpload function
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[1];
        const sheet = workbook.Sheets[sheetName];
        let count = 0;
        for (let cell in sheet) {
          if (cell[0] === 'A' && !isNaN(cell.slice(1))) {
            count++;
          }
        }
        setCount(count);
      } catch (error) {
        console.error('Error reading Excel:', error);
       
      }
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (count !== null) {
    
    }
  }, [count]);

  return (
    <div>
      <div style={{ boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.0)', padding: '18px' }}>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          style={{
            marginLeft: '5px',
            marginTop: '5px',
            padding: '5px',
          }}
        />
        <button
          style={{
            padding: '9px 15px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '8px',
          }}
          onClick={handleUpload}
          disabled={!file}
        >
          Upload
        </button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
      <div style={{ display: 'flex', width: '60vw', justifyContent: 'space-between', margin: 20 }}>
        <WarehouseCard />
        <FpsCard count={count} />
      </div>
      <Graph />
      <Map />
      <QrmChat />
    </div>
  );
}

export default Main;


// -----------------------

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import WarehouseCard from './WarehouseCard';
// import FpsCard from './FpsCard';
// import Graph from './Graph';
// import Map from './Map';
// import QrmChat from './QrmChat';
// // import { FileUpload } from '@mui/icons-material';

// function Main() {
//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [uploadedData, setUploadedData] = useState(null);
//   const [count , setCount] = useState()
//   const defaultFileName = 'Data_1.xlsx';

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
//       alert('Please select an Excel file (XLSX format).');
//       event.target.value = null;
//       setFile(null);
//     } else {
//       setFile(selectedFile);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file.');
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = async (event) => {
//       try {
//         const arrayBuffer = event.target.result;
//         const data = new Uint8Array(arrayBuffer);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheetName = workbook.SheetNames[1];
//         const sheet = workbook.Sheets[sheetName];
//         let count = 0;
//         for (let cell in sheet) {
//           if (cell[0] === "A" && !isNaN(cell.slice(1))) {
//             count++;
//           }
//         }
//         setCount(count)

//         // const formData = new FormData();
//         // formData.append('file', file);

//         // const response = await axios.post('http://localhost:5000/uploadConfigExcel', formData, {
//         //   headers: {
//         //     'Content-Type': 'multipart/form-data',
//         //   },
//         // });

//         // setUploadStatus(response.data.message);

//       } catch (error) {
//         console.error('Error reading Excel:', error);
//         setUploadStatus('Error reading Excel file');
//         setUploadedData(null);
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   useEffect(() => {
//     if (uploadedData) {
//       console.log('Uploaded File Data:', uploadedData);
      
//     }
//   }, [uploadedData]);
//   console.log(uploadedData);

//   const isFileSelected = file !== null;

//   const buttonStyle = {
//     padding: '9px 15px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginTop: '8px',
//   };

//   return (
//     <div>
//       <div style={{ boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.0)', padding: '18px' }}>
//         <input
//           type="file"
//           accept=".xlsx"
//           onChange={handleFileChange}
//           style={{
//             marginLeft: '5px',
//             marginTop: '5px',
//             padding: '5px',
//           }}
//         />
//         <button style={buttonStyle} onClick={handleUpload} disabled={!isFileSelected}>
//           Upload
//         </button>
//         {uploadStatus && <p>{uploadStatus}</p>}
//       </div>
//       <div style={{ display: 'flex', width: '60vw', justifyContent: 'space-between', margin: 20 }}>
//         <WarehouseCard />
//         <FpsCard count={count} />
//       </div>
//       <Graph />
//       <Map />
//       <QrmChat />
//     </div>
//   );
// }

// export default Main;