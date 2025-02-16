interface CollapseBtnProps {
  handleClick: () => void;
}

const CollapseBtn: React.FC<CollapseBtnProps> = ({ handleClick }) => {
  return (
    <button
      className="relative"
      onClick={handleClick}
      aria-label="Collapse sidebar"
      type="button"
    >
      <div className="w-16 h-16 rounded-2xl rotate-45 bg-[#FAF6F3]" />
      <span className="absolute top-1/2 left-1/2 -translate-x-7 -translate-y-5 text-2xl">
        ‹
      </span>
    </button>
  );
};

export default CollapseBtn;
