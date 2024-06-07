import React, { useLayoutEffect, useRef, useState } from "react";
import ChatInputBox from "./components/chatInputBox";
import MessageBox, {
  MessageBoxContainer,
  Avatar,
  Message,
} from "./components/messageBox";
import styled from "styled-components";
import { setClassName, getComponent, getSlot } from "./utils";
import Loading from "./components/loading";
import UserIcon from "./icons/user";
import OpenaiIcon from "./icons/openai";
import { throttle } from "lodash";
import type { ChatgptComponentProps } from "./type";

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
setClassName("IndexContainer", IndexContainer.styledComponentId);
setClassName(
  "MessagesScrollContainer",
  MessagesScrollContainer.styledComponentId
);
setClassName(
  "MessagesContentContainer",
  MessagesContentContainer.styledComponentId
);
setClassName("InputContainer", InputContainer.styledComponentId);

const AIChatComponent: React.FC<ChatgptComponentProps> = ({
  messages,
  error,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  MeAvatar = DefaultMeAvatar,
  GptAvatar = DefaultGptAvatar,
  sendText,
}) => {
  const MessageBoxComponent = getComponent("MessageBox") || MessageBox;
  const ChatInputBoxComponent = getComponent("ChatInputBox") || ChatInputBox;
  const BetweenMessageBoxAndChatInputBox = getSlot(
    "BetweenMessageBoxAndChatInputBox"
  );
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [shouldScrollBottom, setShouldScrollBottom] = useState(true);
  const scrollToBottomDirectly = () => {
    const div = chatContainerRef.current;
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  };
  useLayoutEffect(() => {
    const div = chatContainerRef.current;
    const checkScrollPosition = throttle(() => {
      if (div) {
        const { scrollTop, scrollHeight, clientHeight } = div;
        setShouldScrollBottom(scrollTop + clientHeight >= scrollHeight - 50);
      }
    }, 200);

    div?.addEventListener("scroll", checkScrollPosition, { passive: true });
    return () => div?.removeEventListener("scroll", checkScrollPosition);
  }, []);

  useLayoutEffect(() => {
    if (shouldScrollBottom) {
      scrollToBottomDirectly();
    }
  }, [messages[messages.length - 1]?.content, shouldScrollBottom]);

  return (
    <IndexContainer>
      <MessagesScrollContainer ref={chatContainerRef}>
        <MessagesContentContainer>
          {messages.map((message) => (
            <MessageBoxComponent
              key={message.id}
              side={message.role}
              messageContent={message.content}
              MeAvatar={MeAvatar}
              GptAvatar={GptAvatar}
              isLoading={isLoading}
              input={input}
              error={error}
              message={message}
            />
          ))}
        </MessagesContentContainer>
        {isLoading &&
          messages &&
          messages[messages.length - 1]?.role === "user" && (
            <MessageBoxContainer side={"assistant"}>
              <Avatar avatar={GptAvatar} />
              <Message side={"assistant"} messageContent={<Loading />} />
            </MessageBoxContainer>
          )}
      </MessagesScrollContainer>
      {BetweenMessageBoxAndChatInputBox ? (
        <BetweenMessageBoxAndChatInputBox
          input={input}
          isLoading={isLoading}
          error={error}
        />
      ) : null}
      <InputContainer>
        <ChatInputBoxComponent
          sendText={sendText}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={(...props) => {
            scrollToBottomDirectly();
            handleSubmit(...props);
          }}
        />
      </InputContainer>
    </IndexContainer>
  );
};

export default AIChatComponent;
export * as utils from "./utils";
