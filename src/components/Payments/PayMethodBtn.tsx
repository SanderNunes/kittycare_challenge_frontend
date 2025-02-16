import { FaAngleRight, FaCcAmex } from "react-icons/fa";

const PayMethodBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="cursor-pointer hover:shadow-sm active:shadow-lg" onClick={onClick}>
      <div className="h-[55px] w-full border border-[#898B90] rounded-lg flex justify-between items-center ps-5 pe-2">
        <label className="sm:block text-[16px] w-[40%] text-center text-blue-500 font-semibold">
          Credit or Debit Card
        </label>
        <div className="flex gap-4 items-center">
          <img src="/assets/svg/visa.svg" alt="Visa"/>
          <img src="/assets/svg/master.svg" alt="Mastercard" />
          <FaCcAmex className="text-blue-400 text-3xl"/>
        </div>
        <button className="text-blue-500 text-2xl">
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default PayMethodBtn;
