import React from 'react';
import ChatInputBox from './components/chatInputBox';
import MessageBox, { MessageBoxContainer, Avatar, Message } from './components/messageBox';
import styled from 'styled-components';
import { setClassName, getComponent, getSlot } from './utils';
import { nanoid } from 'nanoid';
import Loading from './components/loading';
import UserIcon from "./icons/user";
import OpenaiIcon from "./icons/openai";
import type { ChatgptComponentProps } from './type';

const DefaultMeAvatar = <UserIcon />;
const DefaultGptAvatar = <OpenaiIcon />;
const IndexContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: Arial, sans-serif;
    textarea {
        font-family: Arial, sans-serif;
    }
`;
const MessagesScrollContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #dddddd;
        border-radius: 6px;
    }
`;
const MessagesContentContainer = styled.div`
    padding: 12px;
`;
const InputContainer = styled.div`
    padding: 12px;
`;
setClassName('IndexContainer', IndexContainer.styledComponentId);
setClassName('MessagesScrollContainer', MessagesScrollContainer.styledComponentId);
setClassName('MessagesContentContainer', MessagesContentContainer.styledComponentId);
setClassName('InputContainer', InputContainer.styledComponentId);

const AIChatComponent: React.FC<ChatgptComponentProps> = ({ 
    messages,
    error,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    MeAvatar = DefaultMeAvatar,
    GptAvatar = DefaultGptAvatar,
    sendText
 }) => {
    const MessageBoxComponent = getComponent('MessageBox') || MessageBox;
    const ChatInputBoxComponent = getComponent('ChatInputBox') || ChatInputBox;
    const BetweenMessageBoxAndChatInputBox = getSlot('BetweenMessageBoxAndChatInputBox')
    console.log('BetweenMessageBoxAndChatInputBox', typeof BetweenMessageBoxAndChatInputBox)

    return (
        <IndexContainer>
            <MessagesScrollContainer>
                <MessagesContentContainer>
                    {messages.map(message => (
                        <MessageBoxComponent 
                            key={nanoid()} 
                            side={message.role} 
                            messageContent={message.content} 
                            MeAvatar={MeAvatar}
                            GptAvatar={GptAvatar}
                            isLoading={isLoading}
                            input={input}
                            error={error}
                        />
                    ))}
                </MessagesContentContainer>
                {(isLoading && messages[messages.length - 1].role !== "assistant") && (
                    <MessageBoxContainer side={"assistant"}>
                    <Avatar avatar={GptAvatar}/>
                    <Message side={"assistant"} messageContent={<Loading/>}/>
                </MessageBoxContainer>
                )}
            </MessagesScrollContainer>
            {BetweenMessageBoxAndChatInputBox ? <BetweenMessageBoxAndChatInputBox input={input} isLoading={isLoading} error={error}/> : null}
            <InputContainer>
                <ChatInputBoxComponent 
                    sendText={sendText} 
                    input={input} 
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </InputContainer>
        </IndexContainer>
    )
};

export default AIChatComponent;
export * as utils from './utils';
