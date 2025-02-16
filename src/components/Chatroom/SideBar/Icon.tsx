import { ButtonHTMLAttributes } from 'react';

// Define color constants
const COLORS = {
  PRIMARY: '#FFA500',
  HOVER: '#FFEEE2',
  DEFAULT: '#F1D3BB',
} as const;

interface IconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  id: string;
  onHover: string;
  isOpen: boolean;
  handleHover: (id: string) => void;
  onClick?: () => void;
}

const Icon = ({
  src,
  id,
  onHover,
  isOpen,
  handleHover,
  onClick,
  className,
  ...props
}: IconProps) => {
  const getBackgroundColor = () => {
    if (id === 'KittyCare') return COLORS.PRIMARY;
    return onHover === id ? COLORS.HOVER : COLORS.DEFAULT;
  };

  const baseClasses = [
    'flex',
    'justify-center',
    'items-center',
    'w-[60px]',
    'h-[60px]',
    'sm:w-[70px]',
    'sm:h-[70px]',
    'rounded-lg',
    'p-3.5',
  ].join(' ');

  return (
    <div className="tooltip">
      <button
        id={id}
        className={`${baseClasses} ${className}`}
        style={{ backgroundColor: getBackgroundColor() }}
        onMouseEnter={() => handleHover(id)}
        onMouseLeave={() => handleHover('')}
        onClick={onClick}
        aria-label={id}
        {...props}
      >
        <img src={src} alt={id} />
      </button>
      {!isOpen && <div className="tooltiptext">{id}</div>}
    </div>
  );
};

export default Icon;
