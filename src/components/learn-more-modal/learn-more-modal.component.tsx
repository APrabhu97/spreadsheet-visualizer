import { Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { StudentDetails } from "../../models/student.model";
import "./learn-more-modal.component.scss";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);
const displayMap = new Map<keyof StudentDetails, string>()
  .set("name", "Name")
  .set("gender", "Gender")
  .set("phone", "Phone")
  .set("email", "Email")
  .set("origin", "City")
  .set("course", "Course")
  .set("foodType", "Food Type")
  .set("budget", "House Budget")
  .set("roomType", "Room type Preference")
  .set("roomNumberPreferences", "No. of Rooms Preference")
  .set("smoke", "Smoking")
  .set("drink", "Drinking");
interface Props {
  student: StudentDetails;
}
export default function LearnMoreModal(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const studentProperties = (
    <div className="all-fields">
      {Array.from(displayMap).map(([key, displayValue]) => {
        return (
          <div className="field-container" key={key}>
            <span className="key-title">{displayValue}</span>
            <span className="key-value">{props.student[key]}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <Button size="small" onClick={handleOpen}>
        Learn More
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Student Details</h2>
            {studentProperties}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
