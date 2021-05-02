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
import cloneDeep from "lodash/cloneDeep";
import React, { useMemo, useState } from "react";
import { AllFiltersOption } from "../../models/filters.model";
import { Student } from "../../models/student.model";
import { FiltersUtilService } from "../../services/filters-util.service";
import "./app-drawer.component.scss";
interface Props {
  onDrawerClosed: () => void;
  drawerOpenState: boolean;
  allStudentsList: Student[];
  filteredStudents: (students: Student[]) => void;
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

  const [currentFilters, setCurrentFilters] = useState<AllFiltersOption[]>([]);

  const handleAllFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const filterNames = event.target.value as string[];
    const filters = filterNames
      .map((filterName) => {
        return (
          currentFilters.find((filter) => filter.displayValue === filterName) ||
          allFilters.find((filter) => filter.displayValue === filterName)!
        );
      })
      .filter(Boolean);
    const filteredStudents = FiltersUtilService.getFilteredStudents(
      props.allStudentsList,
      filters
    );
    setSelectedFilterNames(filterNames);
    setCurrentFilters(filters);
    props.filteredStudents(filteredStudents);
  };

  const handleCurrentFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    name: string
  ) => {
    const filter = currentFilters.find((filter) => filter.field === name)!;
    filter.selectedValues = event.target.value as string[];
    const filters = cloneDeep(currentFilters);
    const filteredStudents = FiltersUtilService.getFilteredStudents(
      props.allStudentsList,
      filters
    );
    setCurrentFilters(filters);
    props.filteredStudents(filteredStudents);
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
          onChange={handleAllFilterChange}
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
        {currentFilters.map((filter) => (
          <ListItem button key={filter.field}>
            <InputLabel id="filter.displayValue">
              {filter.displayValue}
            </InputLabel>
            <Select
              labelId={filter.displayValue}
              id={filter.field}
              multiple
              className="all-filter-select"
              value={filter.selectedValues}
              onChange={(event) =>
                handleCurrentFilterChange(event, filter.field)
              }
              renderValue={(selected) => (selected as []).length + " selected"}
              MenuProps={MenuProps}
            >
              {filter.values.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={filter.selectedValues.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
