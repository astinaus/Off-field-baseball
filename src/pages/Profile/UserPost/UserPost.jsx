import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import {
  POST_ALBUM_OFF,
  POST_ALBUM_ON,
  POST_LIST_OFF,
  POST_LIST_ON,
  IMG_LAYERS,
} from '../../../styles/CommonIcons';
import Post from '../../../components/common/Post/Post';
import { Link, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { UserContext } from '../../../context/UserContext';
import { SYMBOL_LOGO_GRAY } from '../../../styles/CommonImages';

export default function UserPost() {
  const [isList, setIsList] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isEmptyPost, setIsEmptyPost] = useState(false);
  const [numPost, setNumPost] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState('');
  const { username } = useParams();

  const [ref, inView] = useInView();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = 'https://api.mandarin.weniv.co.kr';

  const { token, accountname } = useContext(UserContext);

  const getPostList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${url}/post/${
          username ? username : accountname
        }/userpost?limit=10&skip=${numPost}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
          method: 'GET',
        }
      );
      const data = await res.json();
      setPosts(posts.concat(data.post));
      setIsLoading(false);
      setLoading(false);
      if (data.post.length === 0) {
        setIsEmptyPost(true);
      } else if (data.post.length < 10) {
        setDone(true);
      }
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPost]);

  useEffect(() => {
    if (!done) {
      getPostList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPost, update]);

  useEffect(() => {
    if (inView && !loading) {
      setNumPost((current) => current + 10);
    }
  }, [inView, loading]);
  return (
    <>
      <PostViewBtns>
        <button onClick={() => setIsList(true)}>
          <img
            src={isList ? POST_LIST_ON : POST_LIST_OFF}
            alt='게시물 목록 보기'
          />
        </button>
        <button onClick={() => setIsList(false)}>
          <img
            src={isList ? POST_ALBUM_OFF : POST_ALBUM_ON}
            alt='게시물 앨범 보기'
          />
        </button>
      </PostViewBtns>
      {!isEmptyPost ? (
        <>
          {!isLoading &&
            (isList ? (
              <PostList>
                {posts.map((post, index) =>
                  posts.length - 1 === index ? (
                    <li key={index} ref={ref}>
                      <Post post={post} updatePost={setUpdate} />
                    </li>
                  ) : (
                    <li key={index}>
                      <Post post={post} updatePost={setUpdate} />
                    </li>
                  )
                )}
              </PostList>
            ) : (
              <PostAlbum>
                {/* 이미지를 클릭하면 해당 게시글로 이동해야함 */}
                {posts.map((post, index) => {
                  return post.image ? (
                    post.image.includes(',') ? (
                      <PostAlbumItem key={index}>
                        <Link to={'/post/' + post.id}>
                          <img
                            className='thumbnail'
                            src={post.image.split(',')[0]}
                            alt=''
                          />
                          <img src={IMG_LAYERS} alt='' className='layer' />
                        </Link>
                      </PostAlbumItem>
                    ) : (
                      <PostAlbumItem key={index}>
                        <Link to={'/post/' + post.id}>
                          <img className='thumbnail' src={post.image} alt='' />
                        </Link>
                      </PostAlbumItem>
                    )
                  ) : null;
                })}
              </PostAlbum>
            ))}
        </>
      ) : (
        <EmptyPost>
          <img src={SYMBOL_LOGO_GRAY} alt='' />
          <h2>등록된 게시글이 없습니다!</h2>
        </EmptyPost>
      )}
    </>
  );
}

const PostViewBtns = styled.div`
  padding: 9px 0;
  border-bottom: 1px solid var(--gray-200);
  margin: 0 -16px;
  text-align: right;
  & button {
    width: 26px;
  }

  & button:last-child {
    margin: 0 16px;
  }
`;

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
  margin-bottom: 20px;
`;

const PostAlbum = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 16px;
`;

const PostAlbumItem = styled.li`
  position: relative;
  img {
    aspect-ratio: 1 / 1;
  }

  img.thumbnail {
    object-fit: cover;
  }

  img.layer {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 20px;
    height: auto;
    aspect-ratio: 1 / 1;
  }
`;

const EmptyPost = styled.div`
  margin: 0 -16px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 1.4rem;
    color: var(--gray-400);
  }

  img {
    width: 100px;
    aspect-ratio: 1 / 1;
    margin-bottom: 10px;
  }
`;
