export interface SpreadsheetRow {
  values: SpreadsheetCell[];
}

export interface SpreadsheetCell {
  userEnteredValue: CellValue;
  effectiveValue: CellValue;
  formattedValue: string;
}

export interface CellValue {
  stringValue: string;
}
