import type { UseChatReture } from "../type";

export type RoleType = UseChatReture['messages'][number]['role']
export type MessageBoxProps = Pick<UseChatReture, "isLoading" | 'error' | 'input'> & {
    side?: RoleType;
    messageContent: string | React.ReactElement;
    MeAvatar: React.ReactElement;
    GptAvatar: React.ReactElement;
    message: UseChatReture['messages'][number];
}
export type MessageProps = Partial<Pick<UseChatReture, "isLoading" | 'error' | 'input'>> & {
    side?: RoleType;
    messageContent: string | React.ReactElement;
};
export interface AvatarProps {
    size?: number;
    avatar: React.ReactElement
}
export type BetweenAvatarAndMessageProps = MessageBoxProps
export type AfterMessageProps = MessageBoxProps
