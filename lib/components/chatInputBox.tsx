import React from "react";
import styled from "styled-components";
import { setClassName } from "../utils";
import { ChatInputBoxProps } from "./chatInputBoxTypes";

const ChatInputBoxContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;
const Textarea = styled.textarea`
    resize: none;
    height: 68px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, .3);
    padding: 8px 50px 8px 8px;
    outline: none;
    &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
    }

    &:focus {
        border-color: #1d93ab;
    }
`;
const SendButton = styled.button`
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: fit-content;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 10px;
    border: none;
    background-color: #1d93ab;
    color: white;
`;
setClassName('ChatInputBoxContainer', ChatInputBoxContainer.styledComponentId);
setClassName('Textarea', Textarea.styledComponentId);
setClassName('SendButton', SendButton.styledComponentId);

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
    sendText = "发送",
    placeholderText = "请输入你要问的，按 Enter 发送",
    input,
    handleInputChange,
    handleSubmit,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("Enter");
            // @ts-ignore
            handleSubmit({preventDefault: () => {}});
        }
    };
    return (
        <ChatInputBoxContainer>
            <Textarea 
                placeholder={placeholderText}
                value={input} 
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown}
            />
            {/** @ts-ignore */}
            <SendButton onClick={handleSubmit}>{sendText}</SendButton>
        </ChatInputBoxContainer>
    )
};

export default ChatInputBox;
