import { Navigate, NavLink, useNavigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import {
    Avatar,
    Box,
    Link,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistIcon from '@mui/icons-material/LibraryMusicOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import ErrorMessage from '../../common/components/ErrorMessage';
import Loading from '../../common/components/Loading';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import SpotifyLogo from '../../common/components/Spotify_icon.png';
import LoginButton from '../../common/components/LoginButton';
import { getSpotifyAuthUrl } from '../../utils/auth';
import EmptyPlaylistWithSearch from './components/EmptyPlaylistWithSearch';

const DetailContainer = styled(TableContainer)(({ theme }) => ({
    background: theme.palette.background.paper,
    color: theme.palette.common.white,
    height: 'calc(100% - 64px)',
    borderRadius: '8px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
}));

const DetailHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height: '200px',
    marginTop: '20px',
    padding: '30px',
    borderRadius: '8px',
    border: 'solid 3px #1ed760',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
}));

const DetailAlbumImg = styled(Avatar)({
    width: '130px',
    height: '130px',
    borderRadius: '8px',
    backgroundColor: 'white',
});

const DetailInfoText = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '40px',
});

const ListContainer = styled('div')({
    // height: '300px',
    height: 'calc(100% - 200px - 20px - 30px)',
    overflowY: 'auto',
    marginTop: '15px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
});

const LoginBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100% - 64px)',
    flexDirection: 'column',
});

const LoginBoxTypo = styled(Typography)({
    fontWeight: '600',
    marginBottom: '10px',
});

const PlaylistDetailPage = () => {
    const { ref, inView } = useInView();

    const { id } = useParams<{ id: string }>(); //제네릭 -> 정확하게어떤값을받을지알수있음
    if (id === undefined) return <Navigate to="/" />;

    const { data: playlist, error, isLoading } = useGetPlaylist({ playlist_id: id });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    const {
        data: playlistItems,
        isLoading: isPlaylistItemsLoading,
        error: playlistItemsError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT, offset: 0 });

    // console.log('플리 ', playlistItems);

    if (isLoading) {
        return <Loading />;
    }

    const login = () => {
        getSpotifyAuthUrl();
    };

    // 로그인 에러
    if (error || playlistItemsError) {
        if (error?.status === 401 || playlistItemsError?.status === 401) {
            return (
                <LoginBox>
                    <img src={SpotifyLogo} alt="Spotify Logo" style={{ width: '60px', marginBottom: '30px' }} />
                    <LoginBoxTypo variant="h2">로그아웃 되었습니다.</LoginBoxTypo>
                    <LoginBoxTypo variant="h2">
                        다시{' '}
                        <Link
                            component="button"
                            onClick={login}
                            style={{
                                color: '#1ed760',
                                textDecoration: 'underline',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '2px',
                            }}
                        >
                            로그인
                        </Link>
                        해주세요.
                    </LoginBoxTypo>
                    {/* <LoginButton /> */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <NavLink
                            to="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 12px',
                                marginTop: '30px',
                                color: '#1ed760',
                                textDecoration: 'none',
                                border: '2px solid #1ed760',
                                borderRadius: '20px',
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <HomeIcon />
                                <LoginBoxTypo variant="body1">홈으로 돌아가기</LoginBoxTypo>
                            </Stack>
                        </NavLink>
                    </div>
                </LoginBox>
            );
        }
        return <ErrorMessage errorMessage={'Failed to load'} />;
    }

    return (
        <DetailContainer>
            <DetailHeader>
                <DetailAlbumImg>
                    {playlist?.images ? (
                        <img
                            src={playlist?.images[0].url}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        ></img>
                    ) : (
                        <PlaylistIcon fontSize="large" />
                    )}
                </DetailAlbumImg>
                <DetailInfoText>
                    <Typography variant="h1" fontWeight={700} style={{ marginBottom: '5px' }}>
                        {playlist?.name}
                    </Typography>
                    <Typography variant="h2" fontWeight={500}>
                        <MusicNoteOutlinedIcon sx={{ fontSize: 'small', verticalAlign: 'middle', color: '#1ed760' }} />
                        {playlist?.owner?.display_name + ' • ' + playlist?.tracks.total + ' songs '}
                    </Typography>
                </DetailInfoText>
            </DetailHeader>
            {playlist?.tracks?.total === 0 ? (
                <EmptyPlaylistWithSearch />
            ) : (
                <ListContainer>
                    <Table style={{ marginTop: '10px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Album</TableCell>
                                <TableCell>Date added</TableCell>
                                <TableCell>Duration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playlistItems?.pages.map((page, pIdx) =>
                                page.items.map((item, idx) => {
                                    return (
                                        <DesktopPlaylistItem
                                            key={pIdx * PAGE_LIMIT + idx + 1}
                                            index={pIdx * PAGE_LIMIT + idx + 1}
                                            item={item}
                                        />
                                    );
                                })
                            )}
                            <TableRow sx={{ height: '5px' }} ref={ref} />
                            {isFetchingNextPage}
                        </TableBody>
                    </Table>
                </ListContainer>
            )}
        </DetailContainer>
    );
};

export default PlaylistDetailPage;
