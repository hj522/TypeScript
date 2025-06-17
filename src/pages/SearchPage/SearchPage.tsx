import { Box, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useGetCategory from '../../hooks/useGetCategory';
import Loading from '../../common/components/Loading';
import CategoryCard from '../../common/components/CategoryCard';
import { useState } from 'react';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import SearchResults from './components/SearchResults';
import NotFindIcon from '@mui/icons-material/ErrorOutlineOutlined';

const SearchContainer = styled('div')({
    width: '100%',
    height: '100%',
    padding: '15px',
});

const CategoryContainer = styled('div')({
    width: '100%',
    height: 'auto',
});

const SearchPage = () => {
    const { data, isLoading } = useGetCategory();

    const [keyword, setKeyword] = useState<string>('');

    const {
        data: searchData,
        error,
        isLoading: isSearchLoading,
    } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
    });

    const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    if (isLoading) {
        return <Loading />;
    }

    const tracks = searchData?.pages[0]?.tracks?.items ?? [];
    const albums = searchData?.pages[0]?.albums?.items ?? [];
    const artists = searchData?.pages[0]?.artists?.items ?? [];
    // const isAllEmpty = tracks.length === 0 && albums.length === 0 && artists.length === 0;

    return (
        <SearchContainer>
            <TextField
                value={keyword}
                onChange={handleSearchKeyword}
                placeholder="찾으시는 음악이 있으신가요?"
                style={{
                    width: '430px',
                    marginBottom: '23px',
                    backgroundColor: '#333333',
                    borderRadius: '30px',
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon style={{ color: 'white' }} />
                        </InputAdornment>
                    ),
                    style: {
                        borderRadius: 30,
                    },
                }}
            />
            {!keyword ? (
                <CategoryContainer>
                    <Typography variant="h1" fontWeight={700} marginBottom="10px">
                        Browse All
                    </Typography>
                    {data && data.categories.items.length > 0 ? (
                        <Grid container spacing={2}>
                            {data.categories.items.map((category) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
                                    <CategoryCard image={category.icons[0].url} name={category.name} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : null}
                </CategoryContainer>
            ) : isSearchLoading ? (
                <Loading />
            ) : searchData ? (
                <SearchResults tracks={tracks} albums={albums} artists={artists} />
            ) : (
                //검색결과 없을때...
                <Box display="flex" flexDirection="column" alignItems="center">
                    <NotFindIcon
                        style={{
                            fontSize: 45,
                            marginBottom: '15px',
                            color: '#1ed760',
                        }}
                    />
                    <Typography variant="h1" fontWeight={700} mb="10px" color="text.secondary">
                        '{keyword}' 검색 결과를 찾을 수 없습니다.
                    </Typography>
                    <Typography variant="h2" fontWeight={500} color="text.secondary">
                        입력한 단어의 철자가 맞는지 확인하거나 다른 키워드를 사용하세요.
                    </Typography>
                </Box>
            )}
        </SearchContainer>
    );
};

export default SearchPage;
