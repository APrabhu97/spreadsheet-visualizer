import { Student, StudentDetails } from "./student.model";

export interface AllFiltersOption {
    values: string[];
    displayValue: string;
    field: keyof StudentDetails;
    isSelected?:boolean;
  }