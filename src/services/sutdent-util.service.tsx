import { StudentDetails } from "../models/student.model";
import { SpreadsheetCell, SpreadsheetRow } from "./spreadsheet.model";

export class StudentUtilService {
  private static getCellValue(cell: SpreadsheetCell): string {
    return cell ? (cell.formattedValue ? cell.formattedValue.trim() : "") : "";
  }
  private static getCellValues(cell: SpreadsheetCell): string[] {
    return cell
      ? cell.formattedValue
        ? cell.formattedValue.split(",").map((option) => option.trim())
        : []
      : [];
  }

  private static getCSFormStudentDetails(
    cells: SpreadsheetCell[]
  ): StudentDetails {
    return {
      id: this.getCellValue(cells[0]) + this.getCellValue(cells[2]),
      email: this.getCellValue(cells[1]),
      name: this.getCellValue(cells[2]),
      phone: this.getCellValue(cells[3]),
      gender: this.getCellValue(cells[4]),
      finalizedUic: this.getCellValue(cells[5]),
      commuteTimeOptions: this.getCellValues(cells[6]),
      roomType: this.getCellValue(cells[7]),
      roommateNumberPreferences: this.getCellValues(cells[8]),
      roomNumberPreferences: this.getCellValues(cells[9]),
      mixedHouse: this.getCellValue(cells[10]),
      roommateSmokes: this.getCellValue(cells[11]),
      roommateDrinks: this.getCellValue(cells[12]),
      knowsCooking: this.getCellValue(cells[13]),
      foodType: this.getCellValue(cells[14]),
      roommateLanguagePreference: this.getCellValue(cells[16]),
      origin: this.getCellValues(cells[17])[0],
      gradYear: this.getCellValues(cells[17])[1],
      hobbies: this.getCellValue(cells[18]),
      extraInfo: this.getCellValue(cells[19]),
      visaLocation: this.getCellValue(cells[20]),
      company: this.getCellValues(cells[23])[0],
      experience: this.getCellValues(cells[23])[1],
      intrestedAreas: this.getCellValue(cells[24]),
      socialMediaLinks: this.getCellValue(cells[25]),
      budget: this.getCellValue(cells[28]),
      smoke: this.getCellValue(cells[29]),
      drink: this.getCellValue(cells[30]),
      levelOfStudy: "",
      course: "",
      roommateSameBranchPreference: "",
    };
  }

  private static getGeneralFormStudentDetails(
    cells: SpreadsheetCell[]
  ): StudentDetails {
    return {
      id: this.getCellValue(cells[0]) + this.getCellValue(cells[2]),
      email: this.getCellValue(cells[1]),
      name: this.getCellValue(cells[2]),
      phone: this.getCellValue(cells[3]),
      gender: this.getCellValue(cells[7]),
      roomType: this.getCellValue(cells[8]),
      roommateSameBranchPreference: this.getCellValue(cells[10]),
      roommateNumberPreferences: this.getCellValues(cells[12]),
      roomNumberPreferences: this.getCellValues(cells[11]),
      budget: this.getCellValue(cells[6]),
      smoke: this.getCellValue(cells[16]),
      drink: this.getCellValue(cells[18]),
      course: this.getCellValue(cells[5]),
      levelOfStudy: this.getCellValue(cells[4]),
      roommateSmokes: this.getCellValue(cells[17]),
      roommateDrinks: this.getCellValue(cells[19]),
      knowsCooking: this.getCellValue(cells[15]),
      foodType: this.getCellValue(cells[13]),
      origin: this.getCellValue(cells[20]),
      finalizedUic: "",
      commuteTimeOptions: [""],
      mixedHouse: "",
      roommateLanguagePreference: "",
      gradYear: "",
      hobbies: "",
      extraInfo: "",
      visaLocation: "",
      company: "",
      experience: "",
      intrestedAreas: "",
      socialMediaLinks: "",
    };
  }

  public static toStudent(data: SpreadsheetRow[] | undefined): StudentDetails[] {
    const students: StudentDetails[] = [];
    if (data && data.length > 1) {
      //row 0 is names
      //0th element of every row is timestamp
      //every row is 1 student
      data.forEach((row, idx) => {
        const values = row.values;
        if (idx !== 0 && this.getCellValue(values[2])) {
          const student: StudentDetails = this.getGeneralFormStudentDetails(values);
          students.push(student);
        }
      });
    }
    return students;
  }
}
