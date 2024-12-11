import React from "react";
import { IUserCardProps } from "../../types";
import "./UserCard.css";

export const UserCard: React.FC<IUserCardProps> = ({
  firstName,
  lastName,
  job,
}) => {
  const iconTitle = lastName.charAt(0).toUpperCase();
  return (
    <div className="user_card">
      <div className="user_icon">{iconTitle}</div>
      <div>
        <div className="user_block">{`${lastName} ${firstName}, ${
          job || "No job specified"
        }`}</div>
      </div>
    </div>
  );
};
