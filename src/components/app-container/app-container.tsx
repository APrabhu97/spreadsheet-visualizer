import React, { useState } from "react";
import { RoomType, Student, StudentDetails } from "../../models/student.model";
import {
  SpreadsheetCell,
  SpreadsheetRow,
} from "../../services/spreadsheet.model";
import AppBodyComponent from "../app-body/app-body.component";
import Header from "../header/header";
import LoginComponent from "../login/login.component";
import "./app-container.scss";

export default function AppContainer() {
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetRow[]>();
  const getCellData = (cell: SpreadsheetCell): string => {
    return cell ? cell.formattedValue ? cell.formattedValue : "" : "";
  };
  const getStudentDetails = (cells: SpreadsheetCell[]): StudentDetails => {
    return {
      finalizedUic: getCellData(cells[5]),
      commuteTimeOptions: getCellData(cells[6]).split(",") as any,
      roomType: getCellData(cells[7]) as RoomType,
      roommateNumberPreferences: getCellData(cells[8]) as any,
      roomNumberPreferences: getCellData(cells[9]) as any,
      mixedHouse: getCellData(cells[10]) as any,
      roommateSmokes: getCellData(cells[11]) as any,
      roommateDrinks: getCellData(cells[12]) as any,
      knowsCooking: getCellData(cells[13]) as any,
      foodType: getCellData(cells[14]) as any,
      roommateLanguagePreference: getCellData(cells[16]),
      origin: getCellData(cells[17]).split(",")[0],
      gradYear: getCellData(cells[17]).split(",")[1],
      hobbies: getCellData(cells[18]),
      extraInfo: getCellData(cells[19]),
      visaLocation: getCellData(cells[20]),
      company: getCellData(cells[21]).split(",")[0],
      experience: getCellData(cells[21]).split(",")[1],
      intrestedAreas: getCellData(cells[23]),
      socialMediaLinks: getCellData(cells[22]),
      budget: getCellData(cells[26]),
      smoke: getCellData(cells[27]) as any,
      drink: getCellData(cells[28]) as any,
    };
  };
  const toStudent = (data: SpreadsheetRow[] | undefined): Student[] => {
    const students: Student[] = [];
    if (data && data.length > 1) {
      //row 0 is names
      //0th element of every row is timestamp
      //every row is 1 student
      data.forEach((row, idx) => {
        const values = row.values;
        if (idx !== 0) {
          const student: Student = {
            email: getCellData(values[1]),
            name: getCellData(values[2]),
            phone: getCellData(values[3]),
            gender: getCellData(values[4]),
            details: getStudentDetails(values),
          };
          students.push(student);
        }
      });
    }
    return students;
  };
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
        <span className="login-button"><LoginComponent onDataLoaded={setSpreadsheetData}/></span>
        <AppBodyComponent data={toStudent(spreadsheetData)} />
      </div>
    </div>
  );
}
