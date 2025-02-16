import { FC } from 'react';
import ChatroomLayout from '../components/Chatroom/Layout';
import SideBar from '../components/Chatroom/SideBar';
import ChatField from '../components/Chatroom/ChatField';
import { useInitializeChatroom } from '../hooks/useInitializeChatroom';
import { useSubscriptionCheck } from '../hooks/useSubscriptionCheck';
// import { useLocalStorageCleanup } from '../components/Panels/hooks/useLocalStorageCleanup';

/**
 * Chatroom component that serves as the main chat interface.
 * Handles initialization of conversations, cats data, and subscription checks.
 */
const Chatroom: FC = () => {
  useInitializeChatroom();
  useSubscriptionCheck();
  // useLocalStorageCleanup();
  return (
    <div className="w-full h-[100dvh]">
      <ChatroomLayout>
        <SideBar />
        <ChatField />
      </ChatroomLayout>
    </div>
  );
};

export default Chatroom;
