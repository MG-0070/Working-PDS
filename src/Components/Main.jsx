import React, { useState, useEffect } from "react";
import axios from "axios";
import WarehouseCard from "./WarehouseCard";
import FpsCard from "./FpsCard";
import Graph from "./Graph";
// import Map from "./Map";
import QrmChat from "./QrmChat";
import * as XLSX from "xlsx";
import LPProblemSolver from "./LPProblemSolver";
import ProgressResult from "./ProgressResult";
import uploadImage from "../Img/Upload.jpg.jpeg";
import infoImage from "../Img/info (2).png";
import AnalysisDash from "../Img/analysis.png";
import distribution from "../Img/reduction.png";
import { useContext } from "react";
import userContext from "../Context/userContext";



function Main() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [count, setCount] = useState(null);
  const defaultFileName = "Data_1.xlsx";
  const [capacity, setCapacity] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const { setCounts, setGraphData } = useContext(userContext);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    if (
      selectedFile.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      alert("Please select an Excel file (XLSX format).");
      event.target.value = null;
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("uploadFile", file, file.name);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/uploadConfigExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === 1) {
        setUploadStatus("");
        setFileUploaded(true);

        const response1 = await fetch("http://127.0.0.1:5000/getfcidata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

        });
        const data1 = await response1.json();
        setCounts(data1);

        const response2 = await fetch("http://127.0.0.1:5000/getGraphData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

        });

        const data2 = await response2.json();
        setGraphData(data2);
      } else {
        setUploadStatus(response.data.message || "Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file");
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const response1 = await fetch("http://127.0.0.1:5000/getfcidata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

      });
      const data1 = await response1.json();
      setCounts(data1);

      const response2 = await fetch("http://127.0.0.1:5000/getGraphData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

      });

      const data2 = await response2.json();
      setGraphData(data2);
    };
    fetchdata();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      <div
        style={{
          backgroundColor: "#5E35B1",
          color: "#fff",
          fontSize: "30px",
          fontWeight: "bold",
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        Punjab Intra Route Optimization For PDS
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "55px" }}>
          <div
            style={{
              color: "#5E35B1",
              fontSize: "27px",
              fontWeight: "550",
              display: "flex",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <img
              src={infoImage}
              alt="Template Icon"
              style={{
                maxWidth: "28px",
                maxHeight: "28px",
                marginRight: "13px",
                marginTop: "15px",
                marginDown: "10px",
                fontFamily: "kanit"
              }}
            />
            <span style={{ marginTop: "15px" }}>Template</span>
          </div>
          <div
            style={{
              boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.0)",
              padding: "18px",
              display: "flex",
            }}
          >
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              style={{
                marginLeft: "5px",
                marginTop: "5px",
                padding: "5px",
              }}
            />
            <div>
              <img
                src={uploadImage}
                alt="Upload"
                style={{ maxWidth: "50px", maxHeight: "50px" }}
                onClick={handleUpload}
                disabled={!file}
              />
              <p>
                <b>Upload</b>
              </p>
            </div>

            {/* <button
            style={{
              padding: "9px 11px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "20px",
              marginLeft:"-70px",
              
              
            }}
            
            onClick={handleUpload}
            disabled={!file}
          >
            Upload
          </button> */}

            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
          <div
            style={{
              color: "#5E35B1",
              fontSize: "25px",
              fontWeight: "550",
              display: "flex",
              alignItems: "center",
              marginTop: "6px",
            }}
          >
            <img
              src={AnalysisDash}
              alt="Template Icon"
              style={{
                maxWidth: "65px",
                maxHeight: "38px",
                marginRight: "13px",
                marginTop: "15px",
                marginDown: "10px",
                fontFamily: "kanit"
              }}
            />
            <span style={{ marginTop: "15px" }}>Pre-Analysis</span>
          </div>
          <br /> {/* Line break */}
          <div
            style={{
              color: "#5E35B1",
              fontSize: "25px",
              fontWeight: "650",
              display: "flex",
              alignItems: "center",
              marginTop: "5px",
              marginLeft: "50px",

            }}
          >
            <img
              src={distribution}
              alt="Template Icon"
              style={{
                maxWidth: "45px",
                maxHeight: "38px",
                marginRight: "13px",
                marginTop: "15px",
                marginDown: "10px",
                fontFamily: "monospace"
              }}
            />
            <span style={{ marginTop: "15px" }}>Demand & Supply</span>
          </div>
          <div
            style={{
              display: "flex",
              width: "60vw",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <WarehouseCard />
            <FpsCard count={count} capacity={capacity} />
          </div>
          <Graph />
          {/* <Map /> */}
          <QrmChat />
          <LPProblemSolver />

        </div>
        <div>
          {fileUploaded && (
            <ProgressResult
              uploadStatus={uploadStatus}
              count={count}
              capacity={capacity}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
