import React, { useState, useRef, useEffect } from "react";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

interface AssignmentItem {
  text: string;
  dueDate?: Date;
  completed?: boolean;
}

interface AssignmentsProps {
  assignments: AssignmentItem[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentItem[]>>;
}

export function Assignments({ assignments, setAssignments }: AssignmentsProps) {
  const [completedAssignmentsCount, setCompletedAssignmentsCount] = useState(0);


  const increment = () => {
    setCompletedAssignmentsCount(completedAssignmentsCount + 1);
  };

  const decrement = () => {
    setCompletedAssignmentsCount(completedAssignmentsCount - 1);
  };


  const handleAssignmentDelete = (index: number) => {
    const updatedAssignments = [...assignments];
    updatedAssignments.splice(index, 1);
    setAssignments(updatedAssignments);
  };

  const handleAssignmentToggleComplete = (index: number) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index] = {
      ...updatedAssignments[index],
      completed: !updatedAssignments[index].completed
    };
    setAssignments(updatedAssignments);
    
    
  };

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignments.length}</span>
        </div>


        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{completedAssignmentsCount} of {assignments.length}</span>
        </div>


      </header>
      <div className={styles.list}>
        {assignments.map((assignment, index) => (
          <Assignment
            key={index}
            text={assignment.text}
            dueDate={assignment.dueDate}
            onDelete={() => handleAssignmentDelete(index)}
            onToggleComplete={() => handleAssignmentToggleComplete(index)}
            completed={assignment.completed || false}
            keyNumber={index + 1}
            completedAssignmentsCountValue={completedAssignmentsCount} 
            onIncrement={increment}
            onDecrement={decrement}
          />
        ))}
      </div>
    </section>
  );
}
