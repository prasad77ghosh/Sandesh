import React from "react";

import {
  isSameSender,
  isSameSenderMargin,
  isLastMessage,
  isSameUser,
} from "../../logics/ChatLogic";
import { useContext } from "react";
import MyContext from "../../Context/MyContext";
import { Tooltip, Avatar } from "@chakra-ui/react";
import "./Scroll.css";
import { useEffect } from "react";
import { useRef } from "react";
import Lottie from "react-lottie";
import animationData from "../../Animation/typing.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const ScrollableChat = ({ messages, isTyping }) => {
  const { user } = useContext(MyContext);
  const m_user = user.user;
  const bottomRef = useRef(null);
  const bottomRef_indi = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    bottomRef_indi.current?.scrollIntoView({ behavior: "smooth" });
  }, [isTyping]);
  return (
    <div className="msg_sec">
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, m_user._id) ||
              isLastMessage(messages, i, m_user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === m_user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, m_user._id),
                marginTop: isSameUser(messages, m, i, m_user._id) ? 7 : 10,
                borderRadius: "5px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
      {isTyping ? (
        <div ref={bottomRef_indi}>
          <Lottie
            options={defaultOptions}
            // height={50}
            width={70}
            style={{ marginBottom: 10, marginLeft: 0 }}
          />
        </div>
      ) : (
        <></>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ScrollableChat;
