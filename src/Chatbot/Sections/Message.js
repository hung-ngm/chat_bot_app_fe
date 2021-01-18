import React from "react";
import { List, Avatar, Icon } from "antd";

export const Message = (props) => {
    const AvatarSrc = props.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" /> 
  return (
    <List.Item style={{ padding: "1rem" }}>
      <List.Item.Meta
        avatar={<Avatar icon={AvatarSrc} />}
        title={props.who}
        description={props.text}
      />
    </List.Item>
  );
};
