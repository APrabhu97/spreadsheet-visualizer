import { Button } from "@material-ui/core";
import { gapi, loadAuth2, loadClientAuth2 } from "gapi-script";
import React, { useEffect, useState } from "react";
import { SpreadsheetRow } from "../services/spreadsheet.model";
import { SpreadsheetService } from "../services/spreadsheet.service";

interface Props {
  onDataLoaded: (data: SpreadsheetRow[]) => void;
}
export const GoogleLogin = (props: Props) => {
  const [user, setUser] = useState<any>(null);
  const service = new SpreadsheetService();
  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        process.env.REACT_APP_SHEET_CLIENT_ID!,
        process.env.REACT_APP_SHEET_SCOPE!
      );
      if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get());
      } else {
        attachSignin(document.getElementById("customBtn"), auth2);
      }
    };
    setAuth2();
  }, []);

  useEffect(() => {
    if (!user) {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(
          gapi,
          process.env.REACT_APP_SHEET_CLIENT_ID!,
          process.env.REACT_APP_SHEET_SCOPE!
        );
        attachSignin(document.getElementById("customBtn"), auth2);
      };
      setAuth2();
    }
  }, [user]);

  const updateUser = (currentUser: any) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    setUser({
      name: name,
      profileImg: profileImg,
    });
    getData();
  };

  const getData = async () => {
    const gapiClient = await loadClientAuth2(
      gapi,
      process.env.REACT_APP_SHEET_CLIENT_ID!,
      process.env.REACT_APP_SHEET_SCOPE!
    );
    const params = {
      spreadsheetId: "1ysrPxFihdRTRTHc4tKQZnmjCeq_JoSqEK4IE9EPnJX8", //given in url of the sheet
      ranges: ["Form Responses 1"], //names of the page(given in the bottom of google sheets).
      includeGridData: true,
    };
    const API_KEY = `${process.env.REACT_APP_SHEET_API_KEY}`;
    const CLIENT_ID = `${process.env.REACT_APP_SHEET_CLIENT_ID}`;
    gapi.client
      ?.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
        scope: process.env.REACT_APP_SHEET_SCOPE!,
      })
      .then((cli: any) => {
        const req = gapi.client.sheets.spreadsheets.get(params);
        req.then((response: any) => {
          const rowData: SpreadsheetRow[] =
            response?.result?.sheets[0]?.data[0]?.rowData;
          props.onDataLoaded(rowData);
          console.log(rowData);
        });
      });

    /*     service
      .getSpreadsheetData()
      .pipe(tap((data) => props.onDataLoaded(data)))
      .subscribe(); */
  };

  const attachSignin = (element: any, auth2: any) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        updateUser(googleUser);
      },
      (error: any) => {
        console.log(JSON.stringify(error));
      }
    );
  };

  const butt = (
    <div className="container">
      <div id="customBtn" className="btn login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </div>
    </div>
  );

  return <div>{user ? null : butt}</div>;
};
