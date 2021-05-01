import React from "react";
import CardComponent from "../card/card.component";
import { CardDetail } from "../card/card.model";
import "./card-container.component.scss";

interface Props {
  cardDetails: CardDetail[] | undefined;
}

export default function CardContainer(props: Props) {
  const cards = props.cardDetails?.map((card) => (
    <span className="card" key={card.phoneNumber}>
      <CardComponent cardView={card} />
    </span>
  ));
  return <div className="card-container">{cards}</div>;
}
