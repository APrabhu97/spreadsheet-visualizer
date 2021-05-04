import uniq from "lodash/uniq";
import { AllFiltersOption } from "../models/filters.model";
import { StudentDetails } from "../models/student.model";

export class FiltersUtilService {
  private static getCSFormFilters(): AllFiltersOption[] {
    return [
      {
        displayValue: "Commute Time",
        values: [],
        field: "commuteTimeOptions",
        selectedValues: [],
      },
      {
        displayValue: "Mixed Accommodation",
        values: [],
        field: "mixedHouse",
        selectedValues: [],
      },
      {
        displayValue: "Roommate language preference",
        values: [],
        field: "roommateLanguagePreference",
        selectedValues: [],
      },
      {
        displayValue: "Grad year",
        values: [],
        field: "gradYear",
        selectedValues: [],
      },
      {
        displayValue: "Hobbies",
        values: [],
        field: "hobbies",
        selectedValues: [],
      },
      {
        displayValue: "Company",
        values: [],
        field: "company",
        selectedValues: [],
      },
    ];
  }

  private static getGeneralFormFilters(): AllFiltersOption[] {
    return [
      {
        displayValue: "Level of Study",
        values: [],
        field: "levelOfStudy",
        selectedValues: [],
      },
      {
        displayValue: "Course",
        values: [],
        field: "course",
        selectedValues: [],
      },
      {
        displayValue: "Roommate should be in same branch?",
        values: [],
        field: "roommateSameBranchPreference",
        selectedValues: [],
      },
    ];
  }

  private static getDefaultFormFilters(): AllFiltersOption[] {
    return [
      {
        displayValue: "Gender",
        values: [],
        field: "gender",
        selectedValues: [],
      },
      {
        displayValue: "Room Type",
        values: [],
        field: "roomType",
        selectedValues: [],
      },
      {
        displayValue: "No. of Rooms",
        values: [],
        field: "roomNumberPreferences",
        selectedValues: [],
      },
      {
        displayValue: "No. of Roommates",
        values: [],
        field: "roommateNumberPreferences",
        selectedValues: [],
      },
      {
        displayValue: "Roommate smoking preference",
        values: [],
        field: "roommateSmokes",
        selectedValues: [],
      },
      {
        displayValue: "Roommate drinking preference",
        values: [],
        field: "roommateDrinks",
        selectedValues: [],
      },
      {
        displayValue: "Cooking Knowledge",
        values: [],
        field: "knowsCooking",
        selectedValues: [],
      },
      {
        displayValue: "Food Choice",
        values: [],
        field: "foodType",
        selectedValues: [],
      },
      {
        displayValue: "Origin",
        values: [],
        field: "origin",
        selectedValues: [],
      },
      {
        displayValue: "Housing Budget",
        values: [],
        field: "budget",
        selectedValues: [],
      },
    ];
  }

  private static allFilters: AllFiltersOption[] = [
    ...FiltersUtilService.getDefaultFormFilters(),
    ...FiltersUtilService.getGeneralFormFilters(),
  ];

  public static getAllFilters(students: StudentDetails[]): AllFiltersOption[] {
    students.forEach((student) => {
      this.allFilters.forEach((filter) => {
        Array.isArray(student[filter.field])
          ? filter.values.push(...(student[filter.field] as any[]))
          : filter.values.push(student[filter.field] as string);
      });
    });
    this.allFilters.forEach((filter) => {
      filter.values = uniq(filter.values);
    });
    return this.allFilters;
  }

  public static getFilteredStudents(
    allStudents: StudentDetails[],
    filters: AllFiltersOption[]
  ): StudentDetails[] {
    if (filters.length === 0) {
      return allStudents;
    }
    return allStudents.filter((student) => {
      let isIncluded = true;
      filters.forEach((filter) => {
        const studentValues = student[filter.field];
        if (filter.selectedValues.length === 0) {
          return;
        }
        if (Array.isArray(studentValues)) {
          isIncluded =
            isIncluded &&
            filter.selectedValues.some((selectedValue) =>
              studentValues.includes(selectedValue)
            );
        } else {
          isIncluded =
            isIncluded &&
            filter.selectedValues.includes(studentValues as string);
        }
        if (!isIncluded) {
          return;
        }
      });
      if (isIncluded) {
        return student;
      }
    });
  }
}
