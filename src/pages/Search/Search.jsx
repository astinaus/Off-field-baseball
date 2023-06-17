import React, { useEffect, useState } from 'react';
import TopSearchNav from '../../components/common/TopNavBar/TopSearchNav';
import UserList from '../../components/common/UserList/UserList';
import TabNav from '../../components/common/TabNavBar/TabNav';
import styled from 'styled-components';
import ContentsLayout from '../../components/layout/ContentsLayout/ContentsLayout';
import Loading from '../../components/common/Loading';

export default function Search() {
  const url = 'https://api.mandarin.weniv.co.kr';
  const token = localStorage.getItem('token');
  const [value, setValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (value === '') {
      setIsLoading(false);
      return setSearchResult([]);
    }
    const search = async () => {
      const req = await fetch(`${url}/user/searchuser/?&keyword=${value}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const res = await req.json();
      setSearchResult(res.slice(0, 10));
      setIsLoading(false);
    };
    search();
  }, [value, token]);

  return (
    <>
      <TopSearchNav value={value} setValue={setValue} />
      <ContentsLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <SearchList>
              {searchResult.map((item, idx) => {
                return (
                  <UserList
                    key={idx}
                    profileData={item}
                    teamname={item.intro.split('$')[1]}
                  />
                );
              })}
            </SearchList>
          </>
        )}
      </ContentsLayout>
      <TabNav />
    </>
  );
}

const SearchList = styled.ul`
  & > li:not(:last-child) {
    margin-bottom: 20px;
  }
`;
