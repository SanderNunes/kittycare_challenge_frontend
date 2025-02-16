import { FC } from 'react';
import { LogBtnByProps } from '../../utils/types';

/**
 * LogBtnBy Component
 * 
 * A button component used for third-party authentication options
 * such as Google, Facebook, etc.
 * 
 * @param {string} src - Image source for the authentication provider logo
 * @param {string} alt - Alt text for the image
 * @param {string} className - Additional CSS classes
 */
const LogBtnBy: FC<LogBtnByProps> = ({
  src,
  alt,
  className,
  onClick
}) => {
  const baseStyles = [
    'w-[48px] sm:w-[56px]',
    'h-[48px] sm:h-[56px]',
    'p-3',
    'flex-col',
    'items-center',
    'justify-center',
    'border-2',
    'border-[#898B90]',
    'rounded-[17.5px] sm:rounded-[20px]',
    'cursor-pointer',
    'transition-transform',
    'hover:scale-105',
    className
  ].join(' ');

  const imageContainerStyles = 'w-[31px] h-[31px]';

  return (
    <button
      type="button"
      className={baseStyles}
      onClick={onClick}
      aria-label={`Sign in with ${alt}`}
    >
      <div className={imageContainerStyles}>
        <img
          className="w-full h-full"
          src={src}
          alt={alt}
          loading="lazy"
        />
      </div>
    </button>
  );
};

export default LogBtnBy;
