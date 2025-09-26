import { useState } from "react";
import Clndr from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css"

export default function Calendar() {
  const [value, setValue] = useState<Date>(new Date());

  return (
    <div className="card calendar">
      <Clndr
        onChange={(date) => {
          if (date instanceof Date) {
            setValue(date);
          } else if (Array.isArray(date) && date[0] instanceof Date) {
            setValue(date[0]);
          }
        }}
        value={value}
        locale="ar"
      />
    </div>
  );
}
