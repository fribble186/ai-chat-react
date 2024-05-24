# React AI Chat Component
![](https://img.shields.io/npm/v/ai-chat-react)
![](https://img.shields.io/github/stars/fribble186/ai-chat-react)

这是一个用于与大模型进行聊天交互的 React 组件。该组件允许用户输入文本，将其发送到大模型进行处理，并显示模型的回复。它适用于创建交互式聊天界面，可以轻松集成到任何 React 应用中。需要与 [Vercel AI SDK](https://www.npmjs.com/package/ai) 中的 [useChat 钩子](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat) 一起食用。

<img src="images/normal-example.png" height=300/>

## 功能特点
* 纯 ui 组件，状态和逻辑都在 [Vercel AI SDK](https://www.npmjs.com/package/ai) 中的 [useChat 钩子](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat)中
* cssinjs 组件由 styled-components 组成，使用者可通过 `styled-components` 和 `utils.getClassName` 轻松定制组件内所有样式
* 可插拔设计，通过 `utils.setComponent` 轻松更换某个内部组件
* 可通过 `utils.setSlot` 在预先定义好的地方插入自己的组件

## 开始使用
### 安装
首先，确保项目中已经安装了 React 和 [ai]((https://www.npmjs.com/package/ai))。然后，将此组件添加到你的项目中
``` js
npm install ai-chat-react
```
或者，如果你使用 yarn
``` js
yarn add ai-chat-react
```

### 示例代码
下面是一个如何在你的 React 应用中使用 `AIChatComponent` 的简单示例：
``` jsx
import React from 'react';
import AIChatComponent from 'ai-chat-react'
import { useChat } from 'ai/react';

const Index = () => {
    const chat = useChat();
    return <AIChatComponent {...chat}/>
};

export default Index;
```
结合使用 styled-compoennt 和 utils/getClassName 定制样式的示例：
``` jsx
import React from 'react';
import AIChatComponent， { utils } from 'ai-chat-react'
import styled from 'styled-components';
import { useChat } from 'ai/react';

const ChatContainer = styled.div`
    .${utils.getClassName('SendButton')} {
        color: red;
    }
`
const Index = () => {
    const chat = useChat();
    return <ChatContainer>
        <AIChatComponent {...chat}/>
    </ChatContainer>
};

export default Index;
```

使用 utils/setComponent 更换内部组件的示例：
``` jsx
import React from 'react';
import AIChatComponent, {utils} from 'ai-chat-react'
import { useChat } from 'ai/react';
utils.setComponent('Avatar', () => <span>A</span>)

const Index = () => {
    const chat = useChat();
    return <AIChatComponent {...chat}/>
};

export default Index;
```

使用 utils/setSlot 添加功能的示例：
``` jsx
import React from 'react';
import AIChatComponent, {utils} from 'ai-chat-react'
import { useChat } from 'ai/react';
utils.setSlot('BetweenMessageBoxAndChatInputBox', ({isLoading}) => isLoading ? (<span>loading...</span>)) : null

const Index = () => {
    const chat = useChat();
    return <AIChatComponent {...chat}/>
};

export default Index;
```

在 nextjs 中的示例：
``` jsx
import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useChat } from 'ai/react';

// 因为是异步渲染，所以使用 utils 功能也在 dynamic 中做，在外面使用 utils getClassname 功能会因为还没渲染导致拿不到对应的 classname
const ChatgptComponent = dynamic(() => import("ai-chat-react").then(C => {
  C.utils.setSlot('BetweenMessageBoxAndChatInputBox', () => (<span style={{ color: 'black' }}>BetweenMessageBoxAndChatInputBox</span>));
  const ModalContent = styled.div`
    position: fixed;
    right: 70px;
    bottom: 50px;
    background-color: #fff;
    padding: 20px 10px 30px 10px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    width: 500px;
    height: calc(100vh - 100px);
    .${C.utils.getClassName('AvatarContainer')} {
        color: #333;
    }
`;
const ModalContentTitle = styled.div`
  color: #333;
  padding-bottom: 4px;
  margin-bottom: 4px;
  border-bottom: 1px solid #d6d5d5;
  font-weight: bold;
`;
  return ({...chat}: React.ComponentProps<typeof C.default>) => (
    <ModalContent>
        <ModalContentTitle>与 qianjie 聊天</ModalContentTitle>
        {typeof document !== "undefined" && (
          <C.default {...chat}/>
        )}
    </ModalContent>
  );
}), {ssr: false});
const MemoChatgptComponent = memo(ChatgptComponent);

const Index = () => {
    const chat = useChat();
    return <MemoChatgptComponent {...chat}/>
};

export default Index;
```

### 配置项
`AIChatComponent` 组件接受以下 props 以供配置:

从 useChat 中获得：
* `messages`(from useChat): 
* `error`(from useChat): 
* `input`(from useChat): 
* `handleInputChange`(from useChat): 
* `handleSubmit`(from useChat): 
* `isLoading`(from useChat): 

组件内部属性：
* `MeAvatar`(React.ReactElement):
* `GptAvatar`(React.ReactElement):
* `sendText`(React.ReactElement):

### 贡献
我们欢迎所有形式的贡献，无论是功能请求、bug 报告还是拉取请求。请确保你的代码遵循项目的编码标准。

### 许可证
此项目采用 MIT 许可证。有关更多信息，请查看 LICENSE 文件。
