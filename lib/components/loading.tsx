import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    display: inline-block;
    font-size: 12px;

    & span {
        animation: blink 1.4s infinite both;
    }

    & span:nth-child(2) {
        animation-delay: 0.2s;
    }

    & span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes blink {
        0% {
            opacity: 0;
        }
        40% {
            opacity: 1;
        }
        80% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

`;
const Loading = () => (
    <LoadingContainer>loading<span>.</span><span>.</span><span>.</span></LoadingContainer>
)

export default Loading;
