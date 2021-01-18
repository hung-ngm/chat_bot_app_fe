import React from "react";
import { Chatbot } from "./Chatbot/Chatbot";
import { Typography, Icon } from "antd";
import styled from "styled-components";
const { Title } = Typography;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ChatbotContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <div>
      <TitleContainer>
        <Title level={2}>
          TLC CHATBOT&nbsp;
          <Icon type="robot" />
        </Title>
      </TitleContainer>
      <ChatbotContainer>
        <Chatbot />
      </ChatbotContainer>
    </div>
  );
}

export default App;
