import type { useChat } from 'ai/react';

export type UseChatReture = ReturnType<typeof useChat>;

export type ChatgptComponentProps = Pick<
    UseChatReture,
    'messages' |
    'error' |
    'input' |
    'handleInputChange' |
    'handleSubmit' |
    'isLoading'
> & {
    MeAvatar?: React.ReactElement,
    GptAvatar?: React.ReactElement,
    sendText?: React.ReactElement,
}
export type BetweenMessageBoxAndChatInputBoxProps = Pick<UseChatReture, 'error' | 'isLoading' | 'input'>
