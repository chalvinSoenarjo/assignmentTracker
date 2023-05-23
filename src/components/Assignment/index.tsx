import React, { useState, useRef, useEffect } from "react";
import styles from "./assignment.module.css";
import { BsTrash } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AssignmentProps {
  text: string;
  dueDate?: Date;
  onDelete: () => void;
  onToggleComplete: () => void;
  completed: boolean;
  keyNumber: number;
  completedAssignmentsCountValue: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function Assignment({
  text,
  dueDate,
  onDelete,
  onToggleComplete,
  completed,
  keyNumber,
  completedAssignmentsCountValue,
  onIncrement,
  onDecrement
}: AssignmentProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(dueDate || null);
  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const datePickerRef = useRef<DatePicker>(null);
  const [isTomorrow, setIsTomorrow] = useState(false);

  const handleCheckboxChange = () => {
    onToggleComplete();
  };

  const handleDueButtonClick = () => {
    setShowDatePicker(true);
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleDateInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setShowDatePicker(false);
    }
  };

  const handleAssignmentDelete = () => {
    if (completed ) {
      onDecrement(); /* If I don't include '()'. It doesn't decrement */
    }
    onDelete();
    setSelectedDate(null); // Reset the selectedDate state to null
  
  };

  const calculateDaysRemaining = (): number => {
    if (selectedDate) {
      const today = new Date();
      const due = new Date(selectedDate);
      const timeDiff = due.getTime() - today.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 0;
  };

  const daysRemaining = calculateDaysRemaining();

  useEffect(() => {
    if (daysRemaining === 1) {
      setIsTomorrow(true);
    } else {
      setIsTomorrow(false);
    }
  }, [daysRemaining]);

  useEffect(() => {
    if (dueDate) {
      setSelectedDate(dueDate);
    }
  }, [dueDate]);

  return (
    <div className={`${styles.assignment} ${completed ? styles.completed  : ""}`}>
      <button className={styles.checkContainer} onClick={handleCheckboxChange} >
        <div className={completed ? styles.checkmark : undefined} onClick={completed ? onDecrement : onIncrement }>
          {completed && <span><BsFillCheckCircleFill size={20}  /></span> }
        </div>
      </button>
      <p className={completed ? styles.textCompleted : ""}>
        {text}
        
        {/*  (Key: {keyNumber}) */}
      </p>
      <div className={styles.dueContainer}>
        {showDatePicker ? (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className={styles.datePicker}
            onKeyDown={handleDateInputKeyDown}
            ref={datePickerRef}
            dateFormat="yyyy/MM/dd"
          />
        ) : (
          <button
            className={`${styles.dueButton} ${isTomorrow ? styles.tomorrow : ""}`}
            onClick={handleDueButtonClick}
            ref={dateButtonRef}
          >
            {isTomorrow ? "Tomorrow" : `Due: ${daysRemaining} days`}
          </button>
        )}
      </div>
      <button className={styles.deleteButton} onClick={handleAssignmentDelete}>
        <BsTrash size={20} />
      </button>
    </div>
  );
}
