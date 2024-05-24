import type { UseChatReture } from "../type";

export type ChatInputBoxProps = Pick<UseChatReture, 'input' | 'handleInputChange' | 'handleSubmit'> &{
    sendText?: React.ReactElement,
    placeholderText?: string,
}