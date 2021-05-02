import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useState } from "react";
import { Student } from "../../models/student.model";
import { SpreadsheetRow } from "../../services/spreadsheet.model";
import { StudentUtilService } from "../../services/sutdent-util.service";
import AppBodyComponent from "../app-body/app-body.component";
import AppDrawer from "../app-drawer/app-drawer.component";
import { GoogleLogin } from "../gapi-login";
import Header from "../header/header";
import "./app-container.component.scss";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

export default function AppContainer() {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);

  const onSheetDataLoaded = (data: SpreadsheetRow[]) => {
    const students = StudentUtilService.toStudent(data);
    setSelectedStudents(students);
    setAllStudents(students);
  };

  return (
    <div className={classes.root}>
      <Header
        onDrawerOpened={() => setDrawerOpen(true)}
        drawerOpenState={isDrawerOpen}
      />
      <AppDrawer
        drawerOpenState={isDrawerOpen}
        allStudentsList={allStudents}
        onDrawerClosed={() => setDrawerOpen(false)}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isDrawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <GoogleLogin onDataLoaded={onSheetDataLoaded} />
        <AppBodyComponent data={selectedStudents} />
      </main>
    </div>
  );
}
