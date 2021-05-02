import { RoomType, Student, StudentDetails } from "../models/student.model";
import { SpreadsheetCell, SpreadsheetRow } from "./spreadsheet.model";

export class StudentUtilService {
  private static getCellData(cell: SpreadsheetCell): string {
    return cell ? (cell.formattedValue ? cell.formattedValue : "") : "";
  }

  private static getStudentDetails(cells: SpreadsheetCell[]): StudentDetails {
    return {
        gender: this.getCellData(cells[4]),
      finalizedUic: this.getCellData(cells[5]),
      commuteTimeOptions: this.getCellData(cells[6]).split(","),
      roomType: this.getCellData(cells[7]),
      roommateNumberPreferences: this.getCellData(cells[8]).split(","),
      roomNumberPreferences: this.getCellData(cells[9]).split(","),
      mixedHouse: this.getCellData(cells[10]),
      roommateSmokes: this.getCellData(cells[11]),
      roommateDrinks: this.getCellData(cells[12]),
      knowsCooking: this.getCellData(cells[13]),
      foodType: this.getCellData(cells[14]),
      roommateLanguagePreference: this.getCellData(cells[16]),
      origin: this.getCellData(cells[17]).split(",")[0],
      gradYear: this.getCellData(cells[17]).split(",")[1],
      hobbies: this.getCellData(cells[18]),
      extraInfo: this.getCellData(cells[19]),
      visaLocation: this.getCellData(cells[20]),
      company: this.getCellData(cells[23]).split(",")[0],
      experience: this.getCellData(cells[23]).split(",")[1],
      intrestedAreas: this.getCellData(cells[24]),
      socialMediaLinks: this.getCellData(cells[25]),
      budget: this.getCellData(cells[28]),
      smoke: this.getCellData(cells[29]),
      drink: this.getCellData(cells[30]),
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
            email: this.getCellData(values[1]),
            name: this.getCellData(values[2]),
            phone: this.getCellData(values[3]),
            gender: this.getCellData(values[4]),
            details: this.getStudentDetails(values),
          };
          students.push(student);
        }
      });
    }
    return students;
  }
}
