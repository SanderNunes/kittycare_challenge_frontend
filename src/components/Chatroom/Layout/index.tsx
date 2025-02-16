import { FC } from 'react';
import TopCorner from "/assets/svg/TopCorner.svg";
import BottomCorner from "/assets/svg/BottomCorner.svg";
import { ChatroomLayoutProps } from './types';
import { LAYOUT_CONSTANTS } from './constants';
import { CornerImage } from './CornerImage';

/**
 * ChatroomLayout component that provides the common layout structure
 * for the chatroom interface. It includes decorative corner images
 * and maintains proper z-indexing for content layering.
 *
 * @component
 * @param {ReactNode} children - The content to be rendered within the layout
 * @returns {JSX.Element} The rendered ChatroomLayout component
 */
const ChatroomLayout: FC<ChatroomLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full sm:w-screen h-[100dvh]">
      {/* Background container with corner decorations */}
      <div
        className="w-screen h-screen flex flex-col justify-between fixed -z-50 top-0 right-0"
        style={{ backgroundColor: LAYOUT_CONSTANTS.BACKGROUND_COLOR }}
        aria-hidden="true"
      >
        {/* Top corner decoration */}
        <div className="flex justify-end top-0">
          <div className="w-1/4 h-1/4 md:w-auto lg:w-auto transition-all duration-300">
            <CornerImage
              src={TopCorner}
              alt="Top decorative corner"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Bottom corner decoration */}
        <div className="flex justify-end items-end">
          <div className="w-1/3 md:w-auto lg:w-auto transition-all duration-300">
            <CornerImage
              src={BottomCorner}
              alt="Bottom decorative corner"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full h-[100dvh]">
        {children}
      </div>
    </div>
  );
};
export default ChatroomLayout;

