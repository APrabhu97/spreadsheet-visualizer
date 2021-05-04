import { StudentDetails } from "../../models/student.model";

export interface CardDetail {
  id: string;
  emailId: string;
  phoneNumber: string;
  gender: string;
  name: string;
  student: StudentDetails;
}
