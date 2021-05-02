import { AllFiltersOption } from "../models/filters.model";
import { Student } from "../models/student.model";

export class FiltersUtilService {
  private static allFilters: AllFiltersOption[] = [
    { displayValue: "Gender", values: [], field: "gender" },
    {
      displayValue: "Commute Time",
      values: [],
      field: "commuteTimeOptions",
    },
    { displayValue: "Room Type", values: [], field: "roomType" },
    {
      displayValue: "No. of Rooms",
      values: [],
      field: "roomNumberPreferences",
    },
    {
      displayValue: "No. of Roommates",
      values: [],
      field: "roommateNumberPreferences",
    },
    { displayValue: "Mixed Accommodation", values: [], field: "mixedHouse" },
    {
      displayValue: "Roommate smoking preference",
      values: [],
      field: "roommateSmokes",
    },
    {
      displayValue: "Roommate drinking preference",
      values: [],
      field: "roommateDrinks",
    },
    { displayValue: "Cooking Knowledge", values: [], field: "knowsCooking" },
    { displayValue: "Food Choice", values: [], field: "foodType" },
    {
      displayValue: "Roommate language preference",
      values: [],
      field: "roommateLanguagePreference",
    },
    { displayValue: "Origin", values: [], field: "origin" },
    { displayValue: "Grad year", values: [], field: "gradYear" },
    { displayValue: "Hobbies", values: [], field: "hobbies" },
    { displayValue: "Company", values: [], field: "company" },
    { displayValue: "Housing Budget", values: [], field: "budget" },
  ];

  public static getAllFilters(students: Student[]): AllFiltersOption[] {
    students.forEach((student) => {
      this.allFilters.forEach((filter) => {
        Array.isArray(student.details[filter.field])
          ? filter.values.concat(...(student.details[filter.field] as any[]))
          : filter.values.push(student.details[filter.field] as string);
      });
    });
    return this.allFilters;
  }
}
