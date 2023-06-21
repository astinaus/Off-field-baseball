import React from 'react';
import TopBasicNav from '../../../components/common/TopNavBar/TopBasicNav';
import ChatListStyle from './ChatListStyle';
import ContentsLayout from '../../../components/layout/ContentsLayout/ContentsLayout';
import TabNav from '../../../components/common/TabNavBar/TabNav';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const navigate = useNavigate();

  return (
    <>
      <TopBasicNav />
      <ContentsLayout>
        <ChatListStyle
          userName='최강롯데'
          lastChat='사진을 보냈습니다.'
          date='2023.06.08'
          isNew={true}
          navigate='/chat/user1'
        />
        <ChatListStyle
          userName='MSG랜더스'
          lastChat='재밌게 보고 와~'
          date='2023.06.12'
          isNew={true}
          navigate='/chat/user2'
        />
        <ChatListStyle
          userName='여기한화하나요'
          lastChat='네 그럼 내일 뵐게요!!'
          date='2023.06.15'
          navigate='/chat/user3'
        />
      </ContentsLayout>
      <TabNav currentId={1} />
    </>
  );
};

export default ChatList;
