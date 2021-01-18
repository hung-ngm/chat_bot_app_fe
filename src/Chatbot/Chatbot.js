import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { List, Avatar, Icon } from "antd";

import { saveMessage } from "../_actions/message_actions";
import { Message } from "./Sections/Message";
import Card from "./Sections/Card";

const ChatInput = styled.input`
  margin: 0;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 5px;
  font-size: 1rem;
`;

export const Chatbot = () => {
  const dispatch = useDispatch();
  const messagesFromRedux = useSelector((state) => state.message.messages);

  useEffect(() => {
    eventQuery("welcomeToMyWebsite");
  }, []);

  //TextQuery
  const textQuery = async (text) => {
    // First we need to take care of the message I sent

    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };

    dispatch(saveMessage(conversation));
    console.log("text I sent", conversation);

    //We need to handle the message Chatbot sent

    const textQueryVariables = {
      text,
    };

    try {
      //Send the request to the textQuery Route
      const response = await axios.post(
        "/api/dialogflow/textQuery",
        textQueryVariables
      );
      // const content = response.data.fulfillmentMessages[0];

      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: "bot",
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
    } catch (err) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error occurred",
          },
        },
      };

      dispatch(saveMessage(conversation));
    }
    console.log(conversation);
  };

  //EventQuery
  const eventQuery = async (event) => {
    //We need to handle the message Chatbot sent

    const eventQueryVariables = {
      event,
    };

    try {
      //Send the request to the textQuery Route
      const response = await axios.post(
        "/api/dialogflow/eventQuery",
        eventQueryVariables
      );
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
    } catch (err) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error occurred",
          },
        },
      };

      dispatch(saveMessage(conversation));
    }
  };

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      if (!event.target.value) {
        return alert("You need to message something!");
      }

      //Send request to textQuery route
      textQuery(event.target.value);

      event.target.value = "";
    }
  };

  const renderCards = (cards) => {
    return cards.map((card, i) => {
      return <Card key={i} cardInfo={card.structValue} />
    })
  }

  const renderOneMessage = (message, i) => {
    console.log("message", message);

    //Conditions to separate message kinds

    //Template for normal texts

    if (message.content && message.content.text && message.content.text.text) {
      return (
        <Message key={i} who={message.who} text={message.content.text.text} />
      );
    } else if (message.content && message.content.payload.fields.card) {

      //Template for card messages

      const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" /> 

      return (
        <div>
          <List.Item style={{ padding: "1rem" }}>
            <List.Item.Meta
              avatar={<Avatar icon={AvatarSrc} />}
              title={message.who}
              description={renderCards(message.content.payload.fields.card.listValue.values)}
            />
          </List.Item>
        </div>
      );
    }
  };

  const renderMessage = (returnMessages) => {
    if (returnMessages) {
      return returnMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}>
        {renderMessage(messagesFromRedux)}
      </div>
      <ChatInput
        placeholder="Send a message..."
        onKeyPress={keyPressHandler}
        type="text"
      />
    </div>
  );
};
