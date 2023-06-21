import React, { useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import TopBasicNav from '../../components/common/TopNavBar/TopBasicNav';
import Comment from '../../components/common/Comment/Comment';
import { useParams } from 'react-router-dom';
import Post from '../../components/common/Post/Post';
import { useEffect } from 'react';
import Loading from '../../components/common/Loading';
import ContentsLayout from '../../components/layout/ContentsLayout/ContentsLayout';
import CommentList from './CommentList';
import { UserContext } from '../../context/UserContext';
import { useInView } from 'react-intersection-observer';

const Detail = () => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  // 댓글 달면 바로 업데이트 되도록 하는 state (더 좋은 방법이 있을지 고민 중)
  const [updateComment, setUpdateComment] = useState('');
  //추후 무한 스크롤 구현을 위한 state
  const [numComment, setNumComment] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const url = 'https://api.mandarin.weniv.co.kr';
  const { token } = useContext(UserContext);
  const { inView, ref } = useInView();
  const [userImg, setUserImg] = useState('');
  let { id } = useParams();

  const getUserProfile = async () => {
    try {
      const req = await fetch(`${url}/user/myInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      const res = await req.json();
      setUserImg(res.user.image);
    } catch (err) {
      console.log(err);
    }
  };

  const getPostDetail = async () => {
    setIsLoading(true);
    try {
      const req = await fetch(`${url}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      const res = await req.json();
      setPost(res.post);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      comment: {
        content: comment,
      },
    };
    try {
      const req = await fetch(`${url}/post/${id}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res = await req.json();
      setUpdateComment(res);
      setIsLoading(false);
      setComment('');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getCommentList = useCallback(async () => {
    setLoading(true);
    try {
      const req = await fetch(
        `${url}/post/${id}/comments/?limit=10&skip=${numComment}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const res = await req.json();
      setCommentList(commentList.concat(res.comments));
      if (res.comments.length < 10) setDone(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numComment]);

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!done) {
      getCommentList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numComment]);

  useEffect(() => {
    if (inView && !loading) {
      setNumComment((current) => current + 10);
    }
  }, [inView, loading]);

  useEffect(() => {
    getPostDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, updateComment]);

  useEffect(() => {
    getCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateComment]);

  return (
    <>
      {/* h~ 태그 고려 중 */}
      <h1 className='a11y-hidden'>구장 밖 야구</h1>
      <h2 className='a11y-hidden'>{'애월읍 위니브 감귤농장'} 포스트 페이지</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TopBasicNav />
          <PostWrapper>
            {post && <Post post={post} />}
            <CommentListSection>
              <h3 className='a11y-hidden'>댓글 목록</h3>
              {commentList.length > 0 && (
                <>
                  {commentList.map((comment, index) => {
                    return commentList.length - 1 === index ? (
                      <CommentList
                        key={index}
                        comment={comment}
                        setUpdateComment={setUpdateComment}
                      >
                        <Refrence ref={ref}></Refrence>
                      </CommentList>
                    ) : (
                      <CommentList
                        key={index}
                        comment={comment}
                        setUpdateComment={setUpdateComment}
                      />
                    );
                  })}
                </>
              )}
            </CommentListSection>
          </PostWrapper>
          <Comment
            txt='게시'
            placeholder='댓글 입력하기'
            value={comment}
            setValue={setComment}
            event={handleCommentSubmit}
            userImg={userImg}
          ></Comment>
        </>
      )}
    </>
  );
};

export default Detail;

const CommentListSection = styled.ul`
  border-top: 1px solid var(--gray-200);
  padding: 20px 16px; //bottom : form 높이 + 20px
  margin: 20px -16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PostWrapper = styled(ContentsLayout)`
  min-height: 0;
`;

const Refrence = styled.div`
  position: absolute;
  width: 100%;
`;
