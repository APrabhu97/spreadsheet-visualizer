import { gapi } from "gapi-script";
import { Observable, ReplaySubject } from "rxjs";
import { SpreadsheetRow } from "./spreadsheet.model";

export class SpreadsheetService {
  private data$ = new ReplaySubject<SpreadsheetRow[]>();
  UIC_CS_SHEET = "1ysrPxFihdRTRTHc4tKQZnmjCeq_JoSqEK4IE9EPnJX8";
  UIC_GENERAL_SHEET = "1iRbHoRSJaKoJNDCKeTZ2kREXPHQL7qZma73-AfQReO0";
  CLIENT_ID = `${process.env.REACT_APP_SHEET_CLIENT_ID}`;
  SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
  //gapiClient = loadClientAuth2(gapi, this.CLIENT_ID, this.SCOPE);
  getSpreadsheetData = (): Observable<SpreadsheetRow[]> => {
    const params = {
      spreadsheetId: this.UIC_CS_SHEET, //given in url of the sheet
      ranges: ["Form Responses 1"], //names of the page(given in the bottom of google sheets).
      includeGridData: true,
    };
    const request = gapi.client.sheets.spreadsheets.get(params);
    request.then(
      (response: any) => {
        const rowData: SpreadsheetRow[] =
          response?.result?.sheets[0]?.data[0]?.rowData;
        console.log(rowData);
        this.data$.next(rowData);
      },
      (reason: any) => {
        console.error("error: " + reason.result.error.message);
      }
    );
    return this.data$.asObservable();
  };
}
