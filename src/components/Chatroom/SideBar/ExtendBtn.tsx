import { FC } from 'react';

interface ExtendBtnProps {
  handleClick: () => void;
}

const ExtendBtn: FC<ExtendBtnProps> = ({ handleClick }) => {
  const BUTTON_STYLES = {
    size: 'w-[70px] h-[70px]',
    background: 'bg-[#FADFC9]',
    shape: 'rounded-2xl rotate-45'
  };

  const ARROW_STYLES = {
    position: 'absolute top-1/2 left-1/2',
    transform: 'translate-x-7 -translate-y-5',
    text: 'text-2xl'
  };

  return (
    <button
      className="relative"
      onClick={handleClick}
      aria-label="Extend sidebar"
    >
      <div
        className={`${BUTTON_STYLES.size} ${BUTTON_STYLES.background} ${BUTTON_STYLES.shape}`}
      />
      <span
        className={`${ARROW_STYLES.position} ${ARROW_STYLES.transform} ${ARROW_STYLES.text}`}
        aria-hidden="true"
      >
        ›
      </span>
    </button>
  );
};

export default ExtendBtn;
