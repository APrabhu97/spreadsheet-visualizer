import { Student, StudentDetails } from "../models/student.model";
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

  private static getStudentDetails(cells: SpreadsheetCell[]): StudentDetails {
    return {
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
    };
  }

  public static toStudent(data: SpreadsheetRow[] | undefined): Student[] {
    const students: Student[] = [];
    if (data && data.length > 1) {
      //row 0 is names
      //0th element of every row is timestamp
      //every row is 1 student
      data.forEach((row, idx) => {
        const values = row.values;
        if (idx !== 0) {
          const student: Student = {
            email: this.getCellValue(values[1]),
            name: this.getCellValue(values[2]),
            phone: this.getCellValue(values[3]),
            gender: this.getCellValue(values[4]),
            details: this.getStudentDetails(values),
          };
          students.push(student);
        }
      });
    }
    return students;
  }
}
