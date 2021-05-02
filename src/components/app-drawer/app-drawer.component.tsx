import {
  Checkbox,
  createStyles,
  Divider,
  Drawer,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import React, { useMemo, useState } from "react";
import { Student } from "../../models/student.model";
import { FiltersUtilService } from "../../services/filters-util.service";
import "./app-drawer.component.scss";

interface Props {
  onDrawerClosed: () => void;
  drawerOpenState: boolean;
  allStudentsList: Student[];
}

const drawerWidth = 240;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export default function AppDrawer(props: Props) {
  const classes = useStyles();
  const [selectedFilterNames, setSelectedFilterNames] = useState<string[]>([]);
  const allFilters = useMemo(
    () => FiltersUtilService.getAllFilters(props.allStudentsList),
    [props.allStudentsList]
  );
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedFilterNames(event.target.value as string[]);
  };
  return (
    <Drawer
      className="drawer"
      variant="persistent"
      anchor="left"
      open={props.drawerOpenState}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => props.onDrawerClosed()}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <div className="all-filter-container">
        <InputLabel id="demo-mutiple-checkbox-label">Select Filters</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          className="all-filter-select"
          value={selectedFilterNames}
          onChange={handleChange}
          renderValue={(selected) => (selected as []).length + " selected"}
          MenuProps={MenuProps}
        >
          {allFilters.map((filter) => (
            <MenuItem key={filter.field} value={filter.displayValue}>
              <Checkbox
                checked={selectedFilterNames.includes(filter.displayValue)}
              />
              <ListItemText primary={filter.displayValue} />
            </MenuItem>
          ))}
        </Select>
      </div>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            {/*  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
