import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { chatAPI, updateConversationAPI, createConversationAPI, getConversationsAPI } from '../../services/api';
import { Message } from "../../utils/types";
import { v4 as uuidv4 } from 'uuid';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  needsSync: boolean;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  needsSync: false,
};

export const sendChatMessageAsync = createAsyncThunk(
  'chat/sendMessage',
  async ({ catId, messages }: { catId: string; messages: Message[] }, { rejectWithValue }) => {
    try {
      const messagesWithoutIds = messages.map(({ role, content }) => ({ role, content }));
      const response = await chatAPI({ catId, messages: messagesWithoutIds as Message[] });
      const transformedResponse = {
        id: uuidv4(),
        content: response.message,
        role: "assistant"   
      };
      return transformedResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send message');
    }
  }
);

export const updateConversationAsync = createAsyncThunk(
  'chat/updateConversation',
  async ({ messages }: { messages: Message[] }, { rejectWithValue }) => {
    try {
      const conversationId = localStorage.getItem('conversationId');
      if (!conversationId) {
        throw new Error('No conversation ID found');
      }

      // Only send the latest message and strip ID
      const latestMessage = messages.slice(-1)[0];
      const messageWithoutId = {
        role: latestMessage.role,
        content: latestMessage.content
      };

      const response = await updateConversationAPI({
        id: conversationId,
        messages: [messageWithoutId as Message],
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createConversationAsync = createAsyncThunk(
  'chat/createConversation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await createConversationAPI();
      localStorage.setItem('conversationId', response.id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchConversationsAsync = createAsyncThunk(
  'chat/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getConversationsAPI();
      if (response && response.length > 0) {
        // Get the conversation with the highest ID
        const latestConversation = response.reduce((prev: any, current: any) => {
          return (prev.id > current.id) ? prev : current;
        });
        localStorage.setItem('conversationId', latestConversation.id);
        return latestConversation;
      }
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
      state.error = null;
      state.needsSync = false;
    },
    addMessage: (state, action: PayloadAction<Omit<Message, 'id'>>) => {
      const messageWithId = {
        ...action.payload,
        id: uuidv4()
      };
      state.messages.push(messageWithId);
      state.needsSync = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessageAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendChatMessageAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push(action.payload);
        state.needsSync = true;
      })
      .addCase(sendChatMessageAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateConversationAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(updateConversationAsync.fulfilled, (state) => {
        state.error = null;
        state.needsSync = false;
      })
      .addCase(updateConversationAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(createConversationAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(createConversationAsync.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(createConversationAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchConversationsAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchConversationsAsync.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload) {
          state.messages = action.payload.messages || [];
          state.needsSync = false;
        }
      })
      .addCase(fetchConversationsAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer; 