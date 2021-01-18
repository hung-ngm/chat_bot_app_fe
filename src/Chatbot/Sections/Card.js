import React from "react";
import { Card, Icon } from "antd";

const Meta = Card;

const CardComponent = (props) => {
  return (
    <div>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt={props.cardInfo.fields.description.stringValue}
            src={props.cardInfo.fields.image.stringValue}
          />
        }
        actions={[
          <a target="_blank" rel="nooper noreferrer" href={props.cardInfo.fields.link.stringValue}>
            <Icon type="ellipsis" key="ellipsis" />
          </a>,
        ]}
      >
        <Meta title={props.cardInfo.fields.type.stringValue} description={props.cardInfo.fields.description.stringValue} />
      </Card>
    </div>
  );
};

export default CardComponent;
