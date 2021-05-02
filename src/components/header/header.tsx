import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import "./header.scss";

interface Props {
  onDrawerOpened: () => void;
  drawerOpenState: boolean;
}
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export default function Header(props: Props) {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.drawerOpenState,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            props.onDrawerOpened();
          }}
          edge="start"
          className={clsx(
            classes.menuButton,
            props.drawerOpenState && classes.hide
          )}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap>
          UIC Housing Form Visualizer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
