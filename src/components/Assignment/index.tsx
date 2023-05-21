import React, { useState } from "react";
import styles from "./assignment.module.css";
import { BsTrash } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface AssignmentProps {
  text: string;
  onDelete: () => void;
  completedAssignmentsCountValue: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function Assignment({ text, onDelete, completedAssignmentsCountValue, onIncrement, onDecrement }: AssignmentProps) {
  const [completed, setCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
    
  };

  return (
    <div className={`${styles.assignment} ${completed ? styles.completed : ""}`}>
      <button className={styles.checkContainer} onClick={handleCheckboxChange} >
        <div className={styles.checkmark} onClick={completed ?  onDecrement : onIncrement}>
          {completed && <span><BsFillCheckCircleFill size={20}  /></span> }
        </div>

      </button>

      <p className={completed ? styles.textCompleted : ""}>{text}</p>

      <button className={styles.deleteButton} onClick={onDelete}>
        <BsTrash size={20} />
 
      </button>
    </div>
  );
}
