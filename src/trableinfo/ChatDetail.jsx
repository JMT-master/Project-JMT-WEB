import React from "react";
import * as StompJs from "@stomp/stompjs";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import style from "../css/ChatDetail.css";

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"
></link>;

const ChatDetail = () => {
  const navigate = useNavigate();
  //현재 로그인된 사용자 토큰
  const token = JSON.stringify(window.localStorage.getItem("ACCESS_TOKEN"));
  const [roomId, setRoomId] = useState(
    localStorage.getItem("wschat.roomId") || ""
  );
  const [sender, setSender] = useState(
    localStorage.getItem("wschat.sender") || ""
  );
  const [roomName, setRoomName] = useState(
    localStorage.getItem("wschat.roomName") || ""
  );
  let [client, changeClient] = useState(null);
  //채팅 변수
  const [message, setMessage] = useState("");
  //채팅 기록
  const [messages, setMessages] = useState([]);

  //유저 코드 받을꺼임

  const connect = () => {
    //소켓을 연결합시다
    try {
      client = new StompJs.Client({
        brokerURL: "ws://localhost:8888/ws/chat",
        connectHeaders: {
          token: token,
        },
        debug: function (str) {
          console.log("str임 : " + str);
          console.log("str.chatAt임 : " + str.charAt);
        },
        reconnectDelay: 5000, //자동 재 연결 값
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
      //구독하는 코드
      client.onConnect = function () {
        client.subscribe("/topic/chat/room/" + roomId, onMessageReceived);

        client.publish({
          destination: "/app/chat/message/" + roomId,
          body: JSON.stringify({
            type: "ENTER",
            sender: sender,
            roomId: roomId,
            data: message,
          }),
        });
      };
      client.activate(); //클라이언트 활성화
      changeClient(client); //클라이언트 갱신
    } catch (error) {
      console.log("connect 하면서 생긴 오류 : " + error);
    }
  };

  const onMessageReceived = (message) => {
    console.log("message가 들어오는가..." + message);
    var chat = JSON.parse(message.body);
    console.log("chat이 지금 존재하는가? : " + chat);
    if (chat.type === "ENTER" || chat.type === "LEAVE") {
      // 화면에 입장 또는 퇴장 메시지를 보여줄 DOM 엘리먼트를 생성하고 추가
      const messageElement = document.createElement("div");
      messageElement.classList.add("event-message");
      messageElement.innerText = chat.sender + "님이 입장하였습니다."; // 또는 chat.message 사용

      //여기는 어차피 입장용이니까 다 같은 style을 줘도 괜찮을듯?
      messageElement.style.padding = "10px";
      messageElement.style.margin = "10px 0";
      messageElement.style.textAlign = "center";

      const chatMessages = document.getElementById("chat-messages");
      chatMessages.appendChild(messageElement);
    } else if (chat.type === "TALK") {
      // 'TALK' 대화 메시지 처리
      console.log("chat 한번만 보여줘 : {}", chat);
      console.log(chat.sender + ": " + chat.message);
      // 대화를 화면에 보여줄 DOM 엘리먼트를 생성하고 추가
      const messageElement = document.createElement("div");
      messageElement.classList.add("chat-message");
      messageElement.innerText = chat.sender + ": " + chat.message;

      //여기는 style을 주는 부분
      if (chat.sender == sender) {
        messageElement.style.backgroundColor = "lightblue";
        messageElement.style.color = "black";
        messageElement.style.padding = "10px";
        messageElement.style.margin = "10px 0";
        messageElement.style.width = "40%";
        messageElement.style.borderRadius = "25px";
        messageElement.style.right = "5px";
      } else {
        messageElement.style.backgroundColor = "lightgreen";
        messageElement.style.color = "white";
        messageElement.style.padding = "10px";
        messageElement.style.width = "40%";
        messageElement.style.borderRadius = "25px";
        messageElement.style.margin = "10px 0";
      }

      const chatMessages = document.getElementById("chat-messages");
      //채팅이 올라올 때마다 스크롤바가 항상 하단에 고정되도록
      const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      };
      chatMessages.appendChild(messageElement);
      scrollToBottom();
    }
  };

  const disConnect = () => {
    //연결 끊기
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  const sendChat = (message) => {
    if (message === "") {
      return;
    }
    console.log("message 들어왔나..? : " + message);

    client.publish({
      destination: "/app/chat/message/" + roomId,
      body: JSON.stringify({
        type: "TALK",
        sender: sender,
        roomId: roomId,
        message: message,
      }),
    });
    // setMessages((messages) => [...messages, message]);
    setMessage("");
  };

  useEffect(() => {
    //최초 렌더링 시 웹소켓에 연결해야함
    connect();

    // return () => disConnect();
  }, []);

  const handleSubmit = (e, message) => {
    e.preventDefault();
    sendChat(message);
    console.log(
      "메시지가 잘 div에 들어가나 확인.." +
        document.getElementById("chat-messages").innerText
    );
  };

  const onChangeMessage = (e) => {
    // console.log("e.target.value : " + e.target.value);
    setMessage(e.target.value);
  };
  const outSocket = () => {
    disConnect();
    navigate("/chat/room");
  };

  return (
    <div className="chat-detail-container">
      {/* 나가기 버튼 */}
      <button
        type="button"
        className="chat-detail-out"
        onClick={() => outSocket()}
      >
        나가기
      </button>
      <h1 className="chat-room-title">{roomName}</h1>
      <div
        id="chat-messages"
        // style={{backgroundColor:'#f3a344', color:'white', width:'100%', height:'100%'}}
      >
        {messages.map((message, index) => (
          <div key={index}>{message.message}</div>
        ))}
      </div>
      {/* 여기는 입력 폼 */}
      <form onSubmit={(event) => handleSubmit(event, message)}
      className="chat-input-form">
        <input
          type="text"
          id="msg"
          value={message}
          placeholder="메세지를 입력하세요"
          onChange={onChangeMessage}
          className="chat-input"
        />
      <button type="submit" className="chat-submit">
        전송
      </button>
      </form>
    </div>
  );
};

export default ChatDetail;
