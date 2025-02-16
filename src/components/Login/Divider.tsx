import { FC } from 'react';

interface DividerProps {
  width?: number;
  opacity?: number;
  className?: string;
}

/**
 * Divider component that renders a horizontal line
 * @param {DividerProps} props - Component properties
 * @returns {JSX.Element} A horizontal divider line
 */
const Divider: FC<DividerProps> = ({
  width = 120,
  opacity = 40,
  className = ''
}) => {
  return (
    <div
      className={`h-[1px] bg-black ${className}`}
      style={{
        width: `${width}px`,
        opacity: opacity / 100
      }}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};

export default Divider;