import { ApplePayButtonProps } from "../../utils/types";

// Add this new component
const ApplePayBtn: React.FC<ApplePayButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-[48px] rounded-md flex items-center justify-center bg-black hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      style={{
        WebkitAppearance: "none",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
          <path d="M17.0491 5.42676C16.2939 6.34594 15.1503 6.96977 14.0773 6.96977C13.8743 6.96977 13.6737 6.94863 13.4757 6.90693C13.4631 6.81187 13.4491 6.69595 13.4491 6.55861C13.4491 5.49805 13.9823 4.50744 14.5871 3.84685C15.3423 3.02647 16.5621 2.37776 17.7607 2.33334C17.7747 2.43955 17.7859 2.55603 17.7859 2.68392C17.7859 3.71563 17.3067 4.71738 17.0491 5.42676ZM17.7103 7.10767C16.0871 7.10767 14.7739 8.02741 13.9809 8.02741C13.1264 8.02741 11.9375 7.17818 10.5769 7.17818C7.91953 7.17818 5.14453 9.41278 5.14453 13.6337C5.14453 16.3332 6.16015 19.1761 7.44896 20.9798C8.49609 22.4183 9.41015 23.6668 10.7018 23.6668C12.0432 23.6668 12.5597 22.8183 14.1969 22.8183C15.8705 22.8183 16.2673 23.6351 17.7103 23.6351C19.1533 23.6351 20.0729 22.2666 20.9067 21.0882C21.8795 19.7197 22.2819 18.3861 22.2987 18.3291C22.2399 18.3123 19.3815 17.1624 19.3815 13.9033C19.3815 11.0937 21.6475 9.79828 21.7567 9.72777C20.2795 7.58472 17.9795 7.37286 17.1475 7.32844C17.0017 7.31159 16.856 7.10767 17.7103 7.10767Z" />
        </svg>
        <span className="text-white text-base font-semibold">Pay</span>
      </div>
    </button>
  );
};

export default ApplePayBtn;