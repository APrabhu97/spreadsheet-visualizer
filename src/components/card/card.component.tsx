import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { CardDetail } from "./card.model";
import "./card.component.scss";
interface Props {
  cardView: CardDetail;
}

export default function CardComponent(props: Props) {
  return (
    <Card className="card-detail">
      <CardContent>
        <Typography variant="h5" component="h2">
          Name
        </Typography>
        {props.cardView.name}
        <Typography variant="h5" component="h2">
          Gender
        </Typography>
        {props.cardView.gender}
        <Typography variant="h5" component="h2">
          Number
        </Typography>
        {props.cardView.phoneNumber}
        <Typography variant="h5" component="h2">
          Email
        </Typography>
        {props.cardView.emailId}
      </CardContent>
    </Card>
  );
}
