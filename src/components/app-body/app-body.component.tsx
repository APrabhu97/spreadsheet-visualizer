import React from "react";
import { Student } from "../../models/student.model";
import CardContainer from "../card-container/card-container.component";
import { CardDetail } from "../card/card.model";

interface Props {
  data: Student[] | undefined;
}

export default function AppBodyComponent(props: Props) {
  const toCardDetails = (
    data: Student[] | undefined
  ): CardDetail[] | undefined => {
    return data?.map((student) => {
      return {
        emailId: student.email,
        name: student.name,
        phoneNumber: student.phone,
        gender: student.gender,
      };
    });
  };
  return (
    <div>
      <CardContainer cardDetails={toCardDetails(props.data)} />
    </div>
  );
}
