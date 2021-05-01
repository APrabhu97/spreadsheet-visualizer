import Button from "@material-ui/core/Button";
import React, { useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { LoginService } from "../../services/login.service";
import { SpreadsheetRow } from "../../services/spreadsheet.model";
import { SpreadsheetService } from "../../services/spreadsheet.service";

interface Props {
  onDataLoaded: (data: SpreadsheetRow[]) => void;
}

export default function LoginComponent(props: Props) {
  const destroy$ = useRef(new Subject());
  const loginService = useRef(new LoginService());
  const [isLoggedIn, _setLoggedIn] = useState(false);
  const isLoggedInRef = useRef(false);
  const setLoggedIn = (loggedIn: boolean) => {
    _setLoggedIn(loggedIn);
    isLoggedInRef.current = loggedIn;
  };
  const spreadsheetService = useRef(new SpreadsheetService());

  useEffect(() => {
    loginService.current.handleClientLoad();
    const destroy = destroy$.current;
    loginService.current
      .isSignedIn()
      .pipe(
        tap((signedIn) => {
          setLoggedIn(signedIn);
          if (signedIn) {
            spreadsheetService.current
              .getSpreadsheetData()
              .pipe(
                tap((data) => props.onDataLoaded(data)),
                takeUntil(destroy$.current)
              )
              .subscribe();
          }
        }),
        takeUntil(destroy)
      )
      .subscribe();
    return () => {
      destroy.next();
    };
  }, []);

  const loginButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => loginService.current.handleSignInClick()}
    >
      Login
    </Button>
  );
  /*   const loadSpreadsheetButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => loadSpreadsheet()}
    >
      Load Spreadsheet
    </Button>
  ); */
  return <div>{isLoggedIn ? null : loginButton}</div>;
}
