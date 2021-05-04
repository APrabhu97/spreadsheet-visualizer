import React from "react";
import { StudentDetails } from "../../models/student.model";
import CardContainer from "../card-container/card-container.component";
import { CardDetail } from "../card/card.model";

interface Props {
  data: StudentDetails[] | undefined;
}

export default function AppBodyComponent(props: Props) {
  const toCardDetails = (
    data: StudentDetails[] | undefined
  ): CardDetail[] | undefined => {
    return data?.map((student) => {
      return {
        id: student.id,
        emailId: student.email,
        name: student.name,
        phoneNumber: student.phone,
        gender: student.gender,
        student: student
      };
    });
  };
  return (
    <div>
      <CardContainer cardDetails={toCardDetails(props.data)} />
    </div>
  );
}
