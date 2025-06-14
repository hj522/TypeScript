import React, { useEffect } from 'react';
import { Track } from '../../../models/track';
import { Box, Button, styled, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../common/components/Loading';
import SearchLoading from '../../../common/components/SearchLoading';
import useAddItemToPlaylist from '../../../hooks/useAddItemToPlaylist';
import useGetCurrentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import { idText } from 'typescript';
import { getSpotifyAuthUrl } from '../../../utils/auth';
import { useParams } from 'react-router';

interface SearchResultListProps {
    list: Track[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

const ResultContainer = styled('div')({
    width: '100%',
});

const SearchResultTableRow = styled(TableRow)(({ theme }) => ({
    width: '100%',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '& .MuiTableCell-root': {
        borderBottom: 'none',
    },
}));

const ResultBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

const ResultCoverImage = styled('img')({
    borderRadius: '8px',
    width: '50px',
    height: '50px',
    marginRight: '15px',
});

const ResultTitleTypo = styled(Typography)({
    fontWeight: '700',
});

const ResultArtistTypo = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: '500',
}));

const SearchResultList = ({ list, hasNextPage, fetchNextPage, isFetchingNextPage }: SearchResultListProps) => {
    const { ref, inView } = useInView();
    // console.log('리스트 화긴', list);

    const { mutate: addItem } = useAddItemToPlaylist();
    const { data: user } = useGetCurrentUserProfile();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage]);

    const addItemtoPlaylist = (uri: string) => {
        if (user) {
            // id ->  4j8WfD3b79MWaeaxVXKNO1
            // uri -> spotify:track:3gVbD5APaL2N4yDWM5YWiQ
            addItem({ playlist_id: id, uris: [uri] });
        } else {
            getSpotifyAuthUrl();
        }
    };

    return (
        <ResultContainer>
            <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                <TableBody>
                    {list.map((result) => (
                        <SearchResultTableRow key={result.id}>
                            <TableCell>
                                <ResultBox>
                                    <Box>
                                        <ResultCoverImage src={result.album?.images[0].url} alt="cover image" />
                                    </Box>
                                    <Box>
                                        <ResultTitleTypo>{result.name}</ResultTitleTypo>
                                        <ResultArtistTypo>{result.artists[0]?.name}</ResultArtistTypo>
                                    </Box>
                                </ResultBox>
                            </TableCell>
                            <TableCell>{result.album ? result.album?.name : 'Unknown'}</TableCell>
                            <TableCell>
                                <Button
                                    style={{ border: 'solid 2px #1ed760' }}
                                    onClick={() => addItemtoPlaylist(result.uri)}
                                >
                                    추가하기
                                </Button>
                            </TableCell>
                        </SearchResultTableRow>
                    ))}
                    <div ref={ref} style={{ height: 1 }}>
                        {isFetchingNextPage && <SearchLoading />}
                    </div>
                </TableBody>
            </Table>
        </ResultContainer>
    );
};

export default SearchResultList;
