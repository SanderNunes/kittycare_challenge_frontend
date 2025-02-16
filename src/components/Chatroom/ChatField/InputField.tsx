import { useState } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import { addMessage, sendChatMessageAsync } from "../../../Redux/features/chatSlice";
import { Message } from "../../../utils/types";
import RiveAnimation from "../../RiveAnimation";
import { HiOutlineArrowRight } from "react-icons/hi2";
import React from "react";

interface InputFieldProps {
  onTyping: boolean;
  messageList: Message[];
}

const InputField = ({ onTyping, messageList }: InputFieldProps) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError("");
    setInput("");

    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = '66px';
    }

    const newMessage = {
      content: input,
      role: "user"
    };

    dispatch(addMessage(newMessage));

    const catId = localStorage.getItem('catId');
    if (!catId) {
      setError("No cat found. Please try again later.");
      return;
    }

    const messagesForApi = [...messageList, newMessage].map(({ role, content }) => ({ role, content }));

    try {
      await dispatch(sendChatMessageAsync({
        catId: catId,
        messages: messagesForApi as Message[]
      })).unwrap();
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="text-red-500 text-sm text-center mb-2">
          {error}
        </div>
      )}
      <div className="w-full flex items-center relative">
        <div className={`h-20 ${onTyping ? "w-20" : "w-0"} absolute -top-[80%]`}>
          <RiveAnimation src="riv/V2/Typing_animation.riv" autoplay={true} />
        </div>
        <textarea
          aria-label="Chat message input"
          role="textbox"
          rows={1}
          className="w-full h-auto text-[14px] sm:text-[16px] !p-[20px] sm:p-6 !pr-24 border-2 rounded-[20px] bg-[#F3EDE8] text-opacity-30 font-semibold focus:outline-none resize-none overflow-y-hidden min-h-[66px] max-h-[150px]"
          placeholder="Type your question here…"
          
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          value={input}
        />
        <button
          aria-label="Send message"
          className="w-[50px] h-[38px] sm:w-20 sm:h-14 text-white bg-blue-600 hover:bg-blue-400 active:bg-purple-700 outline-none border-none absolute right-3 border-2 rounded-md sm:rounded-xl flex justify-center items-center"
          onClick={handleSubmit}
        >
          <HiOutlineArrowRight className="text-md sm:text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default InputField;
