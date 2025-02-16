import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tip from "../../Tip";

const DateSelection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const storedDate = localStorage.getItem("selected_date");
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      localStorage.setItem("selected_date", date.toString());
    } else {
      localStorage.removeItem("selected_date");
    }
  };

  return (
    <div className="w-full max-w-lg p-6 rounded-lg mx-auto font-inter">
      <h2 className="text-[20px] font-semibold text-center mb-4">
        Training Schedule
      </h2>
      <div className="w-full max-w-lg p-6 rounded-lg mx-auto font-inter bg-lightPearl border border-pearlBush">
        {/* Header */}
        <div className="flex items-center justify-center px-4 py-2 text-center mb-6">
          <h1 className="w-max bg-lightGray px-4 py-2 rounded-xl font-inter text-[20px] font-semibold text-black leading-[28px]">
            Training Plan
          </h1>
        </div>
        {/* Inline Date Picker */}
        <div className="flex justify-center mb-6">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            calendarClassName="custom-calendar"
            dayClassName={() =>
              "rounded-full hover:bg-orange-200 focus:bg-orange-500"
            }
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <h3 className="font-bold text-sm text-black">You have selected</h3>
          <div>
            {JSON.parse(localStorage.getItem("training_days") || "[]")
              .map((item: string) => (
                <span
                  className="bg-primaryBlue text-white px-3 py-1 rounded-md font-bold text-xs mx-1"
                  key={item}
                >
                  {item}
                </span>
              ))}
          </div>
          <h3 className="font-bold text-sm text-black">As training days.</h3>
        </div>
      </div>
      <Tip text="We’ll send you reminders on your selected training days to keep you and your cat on track!" />
    </div>
  );
};

export default DateSelection;
