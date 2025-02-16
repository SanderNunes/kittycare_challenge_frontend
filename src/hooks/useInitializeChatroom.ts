import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../Redux/hooks';
import { createConversationAsync, fetchConversationsAsync } from '../Redux/features/chatSlice';
import { fetchCatsAsync } from '../Redux/features/catsSlice';
import { setLoading } from '../store/ui/actions';

export const useInitializeChatroom = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Remove main element if it exists
    const mainElement = document.querySelector('[data-id="mainLY"]');
    if (mainElement) mainElement.remove();

    const initializeChatroom = async () => {
      dispatch(setLoading(true));
      
      try {
        const [conversationsResult] = await Promise.all([
          dispatch(fetchConversationsAsync()).unwrap(),
          dispatch(fetchCatsAsync()).unwrap()
        ]);

        if (!conversationsResult) {
          await dispatch(createConversationAsync()).unwrap();
        }
      } catch (error) {
        console.error('Error initializing chatroom:', error);
        // Attempt to create a new conversation as fallback
        await dispatch(createConversationAsync()).unwrap();
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeChatroom();
  }, [dispatch]);
}; 