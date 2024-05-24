import type { ChatInputBoxProps } from "../components/chatInputBoxTypes";
import type { MessageBoxProps, MessageProps, AvatarProps, BetweenAvatarAndMessageProps } from "../components/messageBoxTypes";
import type { BetweenMessageBoxAndChatInputBoxProps } from "../type";

type styledClass = 
    'ChatInputBoxContainer' | 
    'Textarea' | 
    'SendButton' | 
    'MessageBoxContainer' | 
    'AvatarContainer' |
    'MessageContainer' |
    'IndexContainer' |
    'MessagesScrollContainer' |
    'MessagesContentContainer' |
    'InputContainer';

const styledClassNames: Partial<Record<styledClass, string>> = {};

export const getClassName = (key: styledClass) => {
    if (styledClassNames.hasOwnProperty(key)) {
        return styledClassNames[key];
    }
    console.warn("getClassName Warning: key not fond !!!");
    return "";
};

export const setClassName = (key: styledClass, name: string) => {
    styledClassNames[key] = name;
};

type ComponentType = {
    ChatInputBox?: React.FC<ChatInputBoxProps>;
    MessageBox?: React.FC<MessageBoxProps>;
    Message?: React.FC<MessageProps>;
    Avatar?: React.FC<AvatarProps>;
};
const components:ComponentType = {};
export function setComponent<T extends keyof ComponentType>(componentName: T, component: ComponentType[T]): void {
    components[componentName] = component;
}
export function getComponent<T extends keyof ComponentType>(componentName: T): ComponentType[T] | undefined {
    return components[componentName];
}

type SlotType = {
    BetweenMessageBoxAndChatInputBox?: React.FC<BetweenMessageBoxAndChatInputBoxProps>;
    BetweenAvatarAndMessage?: React.FC<BetweenAvatarAndMessageProps>;
};
const slots: SlotType = {};
export function setSlot<T extends keyof SlotType>(slotName: T, component: SlotType[T]): void {
    slots[slotName] = component;
}
export function getSlot<T extends keyof SlotType>(slotName: T): SlotType[T] | undefined {
    return slots[slotName];
}
