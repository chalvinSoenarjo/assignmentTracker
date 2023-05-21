import React, { useState } from "react";
import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";

interface HeaderProps {
  onNewAssignment: (text: string) => void;
}

export function Header({ onNewAssignment }: HeaderProps) {
  const [newAssignmentText, setNewAssignmentText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAssignmentText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newAssignmentText.trim() !== "") {
      onNewAssignment(newAssignmentText);
      setNewAssignmentText("");
    }
  };

  return (
    <header className={styles.header}>
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        <input
          placeholder="Add a new assignment"
          type="text"
          value={newAssignmentText}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={newAssignmentText.trim() === ""}
          className={newAssignmentText.trim() === "" ? styles.disabledButton : ""}

        >
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
