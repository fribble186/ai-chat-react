import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import AIChatComponent, { utils } from "./index.tsx";
import styled from "styled-components";
import { useChat } from "ai/react";
import { nanoid } from "nanoid";
utils.setSlot("AfterMessage", ({ message }) => (
  <span>{message.createdAt?.toString()}</span>
));
// utils.setComponent('Avatar', () => <span>A</span>)

const TestContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 20px);
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
`;
const TestFloatingDiv = styled.div`
  width: 500px;
  height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  min-height: calc(100vh - 200px);
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  border-radius: 8px;
  .${utils.getClassName("SendButton")} {
    color: black;
  }
`;
const markdownString = `
这是一个行内公式示例 $e^{i\pi} + 1 = 0$，以及一个块级公式示例：

$$
c = \\sqrt{a^2 + b^2}
$$
这是一个行内公式示例 $e^{i\pi} + 1 = 0$，以及一个块级公式示例：

$$
c = \\sqrt{a^2 + b^2}
$$
这是一个行内公式示例 $e^{i\pi} + 1 = 0$，以及一个块级公式示例：

$$
c = \\sqrt{a^2 + b^2}
$$
`;

const Root = () => {
  const chat = useChat();
  useEffect(() => {
    let messages: any[] = [];
    setInterval(() => {
      if (messages.length > 10) return;
      if (messages.length % 2) {
        messages = [
          ...messages,
          {
            role: "assistant",
            content: markdownString,
            id: nanoid(),
          },
        ];
        chat.setMessages(messages);
      } else {
        messages = [
          ...messages,
          { role: "user", content: "hello", id: nanoid() },
        ];
        chat.setMessages(messages);
      }
    }, 1000);
  }, []);
  return <AIChatComponent {...chat} />;
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TestContainer>
      <TestFloatingDiv>
        <Root />
      </TestFloatingDiv>
    </TestContainer>
  </React.StrictMode>
);
