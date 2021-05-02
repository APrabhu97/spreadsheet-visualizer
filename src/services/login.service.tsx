import { gapi } from "gapi-script";
import { BehaviorSubject, Observable } from "rxjs";

export class LoginService {
  isSignedIn$ = new BehaviorSubject(Boolean(localStorage.getItem("login")));

  public handleSignInClick = () => {
    const loggedIn = this.isSignedIn$.getValue();
    if (!gapi.auth2.getAuthInstance()) {
      gapi.load("client:auth2", this.initClient());
    }
    if (!loggedIn) {
      gapi.auth2.getAuthInstance()?.signIn();
    }
  };

  public handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  public handleClientLoad = () => {
    gapi.load("client:auth2", this.initClient());
  };

  public isSignedIn = (): Observable<boolean> => {
    return this.isSignedIn$.asObservable();
  };

  private updateSigninStatus = (isSignedIn: boolean) => {
    localStorage.setItem("login", isSignedIn.toString());
    this.isSignedIn$.next(isSignedIn);
  };

  private initClient = () => {
    const API_KEY = `${process.env.REACT_APP_SHEET_API_KEY}`;
    const CLIENT_ID = `${process.env.REACT_APP_SHEET_CLIENT_ID}`;
    const SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
    gapi.client
      ?.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
        scope: SCOPE,
      })
      .then(
        (response: any) => {
          // Listen for sign-in state changes.
          gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(this.updateSigninStatus);

          // Handle the initial sign-in state.
          this.updateSigninStatus(
            gapi.auth2.getAuthInstance().isSignedIn.get()
          );

          gapi.auth2.getAuthInstance().signIn();
        },
        (error: Error) => {
          console.error(error);
        }
      );
  };
}
