import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';
import SearchIcon from '@mui/icons-material/Search';
import Loading from '../../../common/components/Loading';
import NotFindIcon from '@mui/icons-material/ErrorOutlineOutlined';

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword] = useState<string>('');

    const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track],
    });

    const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const tracks = data?.pages[0]?.tracks?.items ?? [];
    const checkResult = tracks.length > 0;

    return (
        <div>
            <Typography variant="h1" mt="20px" mb="15px">
                Let's find something for your Playlist!
            </Typography>
            <TextField
                value={keyword}
                onChange={handleSearchKeyword}
                placeholder="플레이리스트에 추가할 곡을 찾아보세요."
                style={{ width: '430px', marginBottom: '23px', backgroundColor: '#333333' }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon style={{ color: 'white' }} />
                        </InputAdornment>
                    ),
                }}
            />
            <div>
                {isLoading ? (
                    <Loading />
                ) : keyword === '' ? (
                    <></>
                ) : data && checkResult ? (
                    data.pages.map((item, idx) => {
                        if (!item.tracks) return null;
                        return (
                            <SearchResultList
                                key={idx}
                                list={item.tracks.items}
                                hasNextPage={hasNextPage}
                                isFetchingNextPage={isFetchingNextPage}
                                fetchNextPage={fetchNextPage}
                            />
                        );
                    })
                ) : (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        // height="100dvh"
                    >
                        <NotFindIcon
                            style={{
                                fontSize: 45,
                                marginBottom: '15px',
                                color: '#1ed760',
                            }}
                        />
                        <Typography
                            variant="h1"
                            fontWeight={700}
                            mb="10px"
                            color="text.secondary"
                        >{`'${keyword}' 검색 결과를 찾을 수 없습니다.`}</Typography>
                        <Typography variant="h2" fontWeight={500} color="text.secondary">
                            입력한 단어의 철자가 맞는지 확인하거나 다른 키워드를 사용하세요.
                        </Typography>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default EmptyPlaylistWithSearch;
