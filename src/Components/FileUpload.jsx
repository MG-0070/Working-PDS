import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const CombinedUploadComponent = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploadedData, setUploadedData] = useState(null);
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

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:5000/uploadConfigExcel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus(response.data.message);
            if (response.data.status === 1) {
                setUploadedData(response.data.data);
                setFile(new File([file], defaultFileName, { type: file.type }));
                console.log('Uploaded File Data:', response.data.data);
            } else {
                setUploadedData(null);
            }
        } catch (error) {
            console.error('Error uploading file: ', error);
            setUploadStatus('Error uploading file');
            setUploadedData(null);
        }
    };

    useEffect(() => {
        if (uploadedData) {
            console.log('Uploaded File Data:', uploadedData);
        }
    }, [uploadedData]);

    const isFileSelected = file !== null;

    const buttonStyle = {
        padding: '9px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '8px',
    };

    return (
        <div style={{ boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.0)', padding: '18px' }}>
            <input type="file" accept=".xlsx" onChange={handleFileChange} style={{
                marginLeft: '5px',
                marginTop: '5px',
                padding: '5px'
            }}
            />
            <button
                style={buttonStyle}
                onClick={handleUpload}
                disabled={!isFileSelected}
            >
                Upload
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default CombinedUploadComponent;
