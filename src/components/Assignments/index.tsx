
import React, { useState } from 'react';
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

interface AssignmentsProps {
  assignments: string[];
  setAssignments: React.Dispatch<React.SetStateAction<string[]>>;
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

  const assignmentComponents = assignments.map((assignment, index) => (
    <Assignment
      key={index}
      text={assignment}
      onDelete={() => handleAssignmentDelete(index)}
      completedAssignmentsCountValue={completedAssignmentsCount} 
      onIncrement={increment}
      onDecrement={decrement}
    />
  ));

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

      <div className={styles.list}>{assignmentComponents}</div>
    </section>
  );
}
