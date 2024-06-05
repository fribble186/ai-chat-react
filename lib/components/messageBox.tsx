import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RehypeKatex from "rehype-katex";
import RehypeHighlight from "rehype-highlight";
import { setClassName, getComponent, getSlot } from "../utils";
import {
  RoleType,
  MessageBoxProps,
  MessageProps,
  AvatarProps,
} from "./messageBoxTypes";
import "highlight.js/styles/atom-one-dark.css";

const DefaultAvatarSize = 28;

export const MessageBoxContainer = styled.div<{ side: RoleType }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${(props) =>
    props.side === "assistant" ? "flex-start" : "flex-end"};
`;
export const AvatarContainer = styled.div<{ size?: number }>`
  width: ${(props) => `${props.size || DefaultAvatarSize}px`};
  height: ${(props) => `${props.size || DefaultAvatarSize}px`};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #999;
  font-size: ${(props) => `${(props.size || DefaultAvatarSize) - 10}px`};
  img,
  span {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const MessageContainer = styled.div<{ side: RoleType }>`
  border-radius: 10px;
  padding: 10px;
  transition: all 0.3s ease;
  margin-top: 10px;
  margin-bottom: 4px;
  max-width: 80%;
  word-break: break-all;
  color: #333;
  border: 1px solid #dedede;
  background-color: ${(props) =>
    props.side === "assistant" ? "rgba(231, 231, 231)" : "#e7f8ff"};
  width: fit-content;
  p {
    margin: 0;
    padding: 0;
  }
`;
setClassName("MessageBoxContainer", MessageBoxContainer.styledComponentId);
setClassName("AvatarContainer", AvatarContainer.styledComponentId);
setClassName("MessageContainer", MessageContainer.styledComponentId);

export const Message: React.FC<MessageProps> = ({ side, messageContent }) => (
  <MessageContainer side={side!}>
    {typeof messageContent === "string" ? (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[RehypeKatex, RehypeHighlight]}
      >
        {messageContent}
      </ReactMarkdown>
    ) : (
      messageContent
    )}
  </MessageContainer>
);
export const Avatar: React.FC<AvatarProps> = ({ avatar, size }) => (
  <AvatarContainer size={size}>{avatar}</AvatarContainer>
);
const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const {
    side = "assistant",
    messageContent,
    MeAvatar,
    GptAvatar,
    isLoading,
    error,
    input,
  } = props;
  const AvatarComponent = getComponent("Avatar") || Avatar;
  const MessageComponent = getComponent("Message") || Message;
  const BetweenAvatarAndMessage = getSlot("BetweenAvatarAndMessage");
  const AfterMessage = getSlot("AfterMessage");

  return ["assistant", "user"].includes(side) ? (
    <MessageBoxContainer side={side}>
      <AvatarComponent avatar={side === "assistant" ? GptAvatar : MeAvatar} />
      {BetweenAvatarAndMessage ? <BetweenAvatarAndMessage {...props} /> : null}
      <MessageComponent
        side={side}
        messageContent={messageContent}
        isLoading={isLoading}
        error={error}
        input={input}
      />
      {AfterMessage ? <AfterMessage {...props} /> : null}
    </MessageBoxContainer>
  ) : null;
};

export default MessageBox;
