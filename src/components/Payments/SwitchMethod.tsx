import CheckOption from "../Login/CheckOption";
import Toggle from "../Login/Toggle";
import { changeMethod } from "../../Redux/features/billingSlice";
import { RootState } from "../../Redux/store";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";

const SwitchMethod = () => {
  const billingOption = useAppSelector((state: RootState) => state.billing);

  const dispatch = useAppDispatch();

  const handleBillInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMethod({
      ...billingOption,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <div className="w-full text-justify">
      <label className="flex gap-[16px] items-center cursor-pointer mt-3 sm:mt-20">
        <span
          className={`text-[14px] sm:text-[18px] text-black capitalize  ${
            billingOption.method ? "font-medium opacity-60" : "font-bold"
          }`}
        >
          Monthly
        </span>
        <Toggle
          value={billingOption.method}
          name="method"
          onChange={handleBillInfo}
        />
        <span
          className={`text-[14px] sm:text-[18px] text-black capitalize  ${
            !billingOption.method ? "font-medium opacity-60" : "font-bold"
          }`}
        >
          Annually
        </span>
      </label>
      <div className="text-base sm:text-xl font-semibold capitalize my-4">
        Get Full Access To
        <br />
        Kitty Care's Expert Advice For
      </div>
      <div className={`text-[36px] sm:text-[58px] font-semibold ${billingOption.method ? "text-orange-400" : "text-[#0061EF]"} mt-3`}>
        ${0} Today
      </div>
      <div className="text-xl sm:text-2xl font-semibold leading-normal w-full">
        {billingOption.method
          ? `$0.82 USD/Daily, billed annually at $299.99/year after your 7-day
        trial. Cancel anytime.`
          : `$49.99/month after your 3-day trial.
        Cancel anytime.`}
      </div>
      <div className="flex flex-col gap-[20px] my-3">
        <CheckOption
          label="Your Trusted Cat Care Expert"
          content="Providing fast, tailored advice on your cat's health, behavior, and overall well being all from the palm of your hand."
          checked={billingOption.trustOption}
          name="trustOption"
          onChange={handleBillInfo}
        />
        <CheckOption
          label="No strings attached"
          content="Enjoy a 7-day free trial with our flexible monthly or annual plans, giving you peace of mind without commitment."
          checked={billingOption.nostringOption}
          name="nostringOption"
          onChange={handleBillInfo}
        />
        <CheckOption
          label="Save time and money on vet visits"
          content="With expert advice at your fingertips, KittyCare helps you manage minor issues at home, reducing unnecessary vet trips."
          checked={billingOption.saveOption}
          name="saveOption"
          onChange={handleBillInfo}
        />
      </div>
    </div>
  );
};

export default SwitchMethod;
