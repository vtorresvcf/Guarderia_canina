import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

const SelectDates = () => {
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };

  return (
    <div className="w-full ">
      <div
        className="border-2 border-green-600  w-[40%] mx-auto p-5 text-center"
        onClick={() => setOpenCalendar(!openCalendar)}
      >
        {!date.startDate
          ? "Seleccione aquí para reservar"
          : `- ${format(date.startDate, "dd,MMM,yyyy")}- a - ${format(
              date.endDate,
              "dd,MMM,yyyy"
            )}-`}
      </div>
      {openCalendar && (
        <div className="mx-auto">
          <DateRange
            ranges={[date]}
            onChange={handleChange}
            rangeColors={["#15803D"]}
            minDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

export default SelectDates;
