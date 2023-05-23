import React, { useState } from "react";
import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";

function App() {
  const [assignments, setAssignments] = useState<{ text: string; dueDate?: Date; completed?: boolean }[]>([]);

  const handleNewAssignment = (text: string) => {
    setAssignments([...assignments, { text }]);
  };

  return (
    <>
      <Header onNewAssignment={handleNewAssignment} />
      <Assignments assignments={assignments} setAssignments={setAssignments} />
    </>
  );
}

export default App;
