import React from "react";
import TopCorner from "/assets/svg/TopCorner.svg";
import BottomCorner from "/assets/svg/BottomCorner.svg";
import { useAppDispatch } from "../../../Redux/hooks";
import { deleteSubscriptionAsync } from "../../../Redux/features/subscriptionSlice";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../store/ui/actions";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CancelModal: React.FC<CancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    dispatch(setLoading(true));

    try {
      await dispatch(deleteSubscriptionAsync()).unwrap();
      onConfirm();
      navigate("/progress");
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      // Optionally handle error (show error message, etc.)
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 p-1 py-2 flex items-end sm:items-center justify-center">
      <div className="z-50">
        <div className="w-screen h-screen flex flex-col justify-between fixed bg-[#FAF6F3] -z-50 top-0 right-0">
          <div className="flex justify-end top-0">
            <div className="w-1/4 h-1/4 sm:w-auto">
              <img src={TopCorner} alt="TopCorner" />
            </div>
          </div>
          <div className="flex justify-end items-end">
            <div className="w-1/3 sm:w-auto">
              <img src={BottomCorner} alt="BottomCorner" />
            </div>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#FAF6F3] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-[95%] sm:w-[520px] p-2 pt-[30px] rounded-[20px] sm:rounded-[50px] border sm:border-2 border-[#DBCEC4] bg-[#F3EDE8] text-center flex flex-col justify-center items-center">
        <div className="w-[57px] h-[57px] sm:w-[76px] sm:h-[76px] absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-[20px] border-[2.5px] border-[#5E4D3F] border-opacity-10 bg-[#FFCE01] flex items-center justify-center text-[36px] sm:text-[48px] font-bold">
          !
        </div>
        <h2 className="text-xl font-bold sm:font-semibold text-gray-900 mt-[20px] sm:mt-[40px]">
          Cancel Subscription?
        </h2>

        <p className="text-base sm:text-[20px] font-medium text-[#404040] mt-4 sm:mt-6 w-[280px] sm:w-[396px]">
          Are you sure you want to cancel your subscription? We'll miss you!
        </p>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-[10px] justify-end mt-[20px] sm:mt-9 sm:mb-8">
          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto rounded-[20px] bg-[#0061EF] hover:bg-[#0061EF]/80 active:bg-[#0061EF]/60 px-[42px] py-[14px] text-white font-semibold flex items-center justify-center"
          >
            Yes, Cancel
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-[20px] px-[42px] py-[14px] text-[#898B90] hover:bg-[#dddddd]/70 active:bg-[#cccccc] font-semibold flex items-center justify-center border border-[#898B90] "
          >
            Keep Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
