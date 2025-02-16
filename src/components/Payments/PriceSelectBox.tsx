import { PriceSelectBoxProps } from "../../utils/types";

const PriceSelectBox = ({
  checked,
  method,
  annual,
  monthly,
  daily,
  isBest,
}: PriceSelectBoxProps) => {
  return (
    <div
      className={`relative w-full px-8 h-[200px] sm:h-[280px] py-[70px] sm:py-[95px] rounded-[14px] sm:rounded-[20px] border-[1.5px] sm:border-2 border-[#B8B8B8] ${
        checked ? "bg-[#FFCE01]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div>
            <div className="self-stretch text-[22px] sm:text-[32px] font-bold">
              {method ? "Annual" : "Monthly"} -{" "}
              <span className="text-[#0061EF]">
                {method ? "7" : "3"} Days Free
              </span>
            </div>
          </div>
          <div>
            {annual && (
              <div className="self-stretch text-[18px] sm:text-[24px] font-semibold">
                ${annual} USD/Year
              </div>
            )}
            {monthly && (
              <div className="self-stretch text-[18px] sm:text-[24px] font-semibold">
                ${monthly} USD/Month
              </div>
            )}
            {daily && (
              <div className="self-stretch text-[18px] sm:text-[24px] font-semibold">
                ${daily} USD/Day
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="w-[48px] h-[48px] flex items-center rounded-2xl">
            <img
              className="w-full h-full"
              src={checked ? "/assets/svg/checked.svg" : "/assets/svg/unchecked.svg"}
            />
          </div>
        </div>
      </div>
      {isBest && (
        <span className="absolute top-[-20px] left-[10%] text-[14px] sm:text-[18px] text-center font-semibold text-[#FAF6F3] bg-[#0061EF] rounded-[7.2px] sm:rounded-[10px] px-[21px] py-[7px]">
          Best Value
        </span>
      )}
    </div>
  );
};

export default PriceSelectBox;
