import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { Switch, Button, Dropdown, Menu } from "antd";
import styled from "styled-components";
import infoImage from "../Img/clipboard.png";

const StyledButton = styled(Button)`
  && {
    background-color: red;
    border-color: #4527a0;
    color: white;
    border-radius: 20px;
  }

  &&:focus {
    background-color: #4527a0;
    border-color: #4527a0;
    color: white;
    border-radius: 20px;
  }
`;

const LPProblemSolverWithSwitch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const [switchState, setSwitchState] = useState(false);

  const solveLPProblem = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/processFile");
      const responseData = response.data;
      setResultData(responseData);
      console.log(responseData);
    } catch (error) {
      setError("Error solving LP problem");
      console.error("Error solving LP problem:", error);
    }
    setIsLoading(false);
  };

  const onChange = (checked) => {
    console.log(`Switch state: ${checked}`);
    setSwitchState(checked);
    if (checked) {
      solveLPProblem();
    }
  };

  const downloadFile = (format) => {
    if (resultData) {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      const formattedTime = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
      const timestamp = `${formattedDate}_${formattedTime}`;

      if (format === "excel") {
        const fileName = `data_${timestamp}.xlsx`;
        const wsData = [
          ["Total Cost", "Demand", "Average Distance"],
          [resultData.totalCost, resultData.Demand, resultData.Average_Distance],
        ];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, fileName);
      } else if (format === "pdf") {
        const pdf = new jsPDF();
        const text = `Total Cost: ${resultData.totalCost}\nDemand: ${resultData.Demand}\nAverage Distance: ${resultData.Average_Distance}`;
        pdf.text(text, 10, 10);
        pdf.save(`data_${timestamp}.pdf`);
      }
    }
  };

  const handleDownload = ({ key }) => {
    downloadFile(key);
  };

  const menu = (
    <Menu onClick={handleDownload}>
      <Menu.Item key="excel">
        Download Excel
      </Menu.Item>
      <Menu.Item key="pdf">
        Download PDF
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div
        style={{
          color: "#5E35B1",
          fontSize: "25px",
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
          }}
        />
        <span style={{ marginTop: "15px" }}>Optimal Plan</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "10px",
          color: switchState ? "red" : "green",
          borderRadius: "20px",
        }}
      >
        <StyledButton
          style={{ borderRadius: "20px", marginRight: "10px" }}
          disabled={isLoading}
          onClick={solveLPProblem}
        >
          {isLoading ? "Generating..." : "Generate Optimized Plan"}
        </StyledButton>
        <div style={{ marginLeft: "10px", color: switchState ? "red" : "green" }}>
          <Switch checked={switchState} onChange={onChange} />
        </div>
      </div>
      {error && <p>{error}</p>}
      {resultData && (
        <div>
          <div style={{ marginLeft: "1100px" }}>
            <Dropdown overlay={menu}>
              <StyledButton>
                Download
              </StyledButton>
            </Dropdown>
          </div>
          <h2 style={{ color: "black" }}>Optimizing Results</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "10px",
            }}
          >
            <table
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                borderCollapse: "collapse",
                width: "128vh",
                textAlign: "center",
                margin: "0 auto", 
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "5px",
                      backgroundColor: "#007BFF",
                      color: "white",
                      textAlign: "center",
                      margin: "0 auto", 
                    }}
                  >
                    Total Cost
                  </th>
                  <th
                    style={{
                      padding: "5px",
                      backgroundColor: "#007BFF",
                      color: "white",
                      textAlign: "center",
                      margin: "0 auto", 
                    }}
                  >
                    Demand
                  </th>
                  <th
                    style={{
                      padding: "5px",
                      backgroundColor: "#007BFF",
                      color: "white",
                      textAlign: "center",
                      margin: "0 auto", 
                    }}
                  >
                    Average Distance
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td
                    style={{
                      border: "3px solid #ddd",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {resultData.totalCost}
                  </td>
                  <td
                    style={{
                      border: "3px solid #ddd",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {resultData.Demand}
                  </td>
                  <td
                    style={{
                      border: "3px solid #ddd",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    {resultData.Average_Distance}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LPProblemSolverWithSwitch;
