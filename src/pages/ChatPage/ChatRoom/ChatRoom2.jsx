import React from 'react';
import styled from 'styled-components';
import TopChatNav from '../../../components/common/TopNavBar/TopChatNav';
import MyChat from './MyChat';
import UserChat from './UserChat';
import Comment from '../../../components/common/Comment/Comment';
import ChatImg3 from '../../../assets/images/chat-img3.jpg';

const ChatRoom = () => {
  return (
    <>
      <TopChatNav />
      <ChatRoomStyle>
        <MessageWrapper>
          <MyChat time='18:46'>님 오늘 경기 옴? 자리 어디? 난 여기</MyChat>
          <MyChat time='18:47' isImg img={ChatImg3}></MyChat>
          <UserChat time='19:10'>나 오늘은 못갔어ㅠ</UserChat>
          <UserChat time='19:12'>재밌게 보고 와~</UserChat>
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
