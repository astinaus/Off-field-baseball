import React from 'react';
import styled from 'styled-components';
import TopChatNav from '../../../components/common/TopNavBar/TopChatNav';
import MyChat from './MyChat';
import UserChat from './UserChat';
import Comment from '../../../components/common/Comment/Comment';
import ChatImg1 from '../../../assets/images/chat-img1.jpg';

const ChatRoom = () => {
  return (
    <>
      <TopChatNav />
      <ChatRoomStyle>
        <MessageWrapper>
          <UserChat time='20:51'>안녕하세요 직거래 가능하신가요?</UserChat>
          <MyChat time='21:30'>넵 사직에서 가능해요</MyChat>
          <MyChat time='21:32' isImg img={ChatImg1}></MyChat>
          <UserChat time='21:45'>
            네네 그럼 직거래로 하겠습니다 내일 경기 전에 괜찮으신가요?
          </UserChat>
          <MyChat time='22:02'>네 그럼 내일 뵐게요!!</MyChat>
        </MessageWrapper>
      </ChatRoomStyle>
      <Comment />
    </>
  );
};

export default ChatRoom;

const ChatRoomStyle = styled.div`
  background-color: var(--gray-100);
  padding: 4.8rem 0 0;
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 109px);
  padding: 0 1.6rem 2rem;
  justify-content: flex-end;
  overflow-y: hidden;
`;
