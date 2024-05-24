import type { UseChatReture } from "../type";

export type RoleType = UseChatReture['messages'][number]['role']
export type MessageBoxProps = Pick<UseChatReture, "isLoading" | 'error' | 'input'> & {
    side?: RoleType;
    messageContent: string | React.ReactElement;
    MeAvatar: React.ReactElement;
    GptAvatar: React.ReactElement;
}
export type MessageProps = Partial<Pick<UseChatReture, "isLoading" | 'error' | 'input'>> & {
    side?: RoleType;
    messageContent: string | React.ReactElement;
};
export interface AvatarProps {
    size?: number;
    avatar: React.ReactElement
}
export type BetweenAvatarAndMessageProps = Pick<UseChatReture, "isLoading" | 'error' | 'input'>
