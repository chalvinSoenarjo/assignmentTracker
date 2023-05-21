import React from "react";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

interface AssignmentsProps {
  assignments: string[];
  setAssignments: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Assignments({ assignments, setAssignments }: AssignmentsProps) {
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
          <span>0 of {assignments.length}</span>
        </div>
      </header>

      <div className={styles.list}>{assignmentComponents}</div>
    </section>
  );
}
