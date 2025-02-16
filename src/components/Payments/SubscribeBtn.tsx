const SubscribeBtn = ({ payBy, onClick }: { payBy: string, onClick: () => void }) => {
  return (
    <div className="w-full h-[52px]">
      <button
        className="w-full h-[55px] text-base sm:text-xl border-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-800 focus:outline-none"
        type="submit"
        onClick={onClick}
      >
        <div className="flex gap-2 justify-center items-center">
          <span>Subscribe With</span>
          <span>
            <img src={`/assets/svg/${payBy}2.svg`} alt={payBy} />
          </span>
          <span>Pay</span>
        </div>
      </button>
    </div>
  );
};

export default SubscribeBtn;