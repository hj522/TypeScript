import {
    Box,
    Menu,
    MenuItem,
    Snackbar,
    styled,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
import { Track } from '../../../models/track';
import { format } from 'date-fns';
import PlayButton from '../../../common/components/PlayButton';
import AddButton from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import useGetCurrentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import useGetCurrentUserPlaylists from '../../../hooks/useGetCurrentUserPlaylists';
import useAddItemToPlaylist from '../../../hooks/useAddItemToPlaylist';
import { useNavigate } from 'react-router';

interface SongsResultListProps {
    tracks: Track[];
}

const SongsContainer = styled('div')(({ theme }) => ({
    width: '50%',
    height: '275px',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 'auto',
    },
}));

const TopResultContainer = styled('div')(({ theme }) => ({
    width: '50%',
    height: '275px',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 'auto',
    },
}));

const TopResultSubContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '10px',
    // padding: '10px',
}));

const TopResultDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    minHeight: '230px',
    padding: '10px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover .btnDiv': {
        opacity: 1,
    },
    '&:hover .titleTypo': {
        color: '#1ed760',
    },
    '&:hover .artistTypo': {
        color: theme.palette.text.primary,
    },
}));

const ButtonDiv = styled('div')({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
});

const CoverImage = styled('img')({
    borderRadius: '4px',
    marginRight: '12px',
});

const EllipsisTypography = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis ',
});

const SongsTableRow = styled(TableRow)(({ theme }) => ({
    transition: 'background-color 0.2s ease-in-out',
    '& .MuiTableCell-root': {
        borderBottom: 'none',
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover .addBtn': {
        opacity: 1,
        visibility: 'visible',
    },
    '& .addBtn': {
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.2s ease-in-out',
    },
}));

const SongTableCell = styled(TableCell)({
    padding: '6px',
});

const AddMenu = styled(Menu)({
    '& .MuiPaper-root': {
        color: 'white',
        maxWidth: '25vh',
        maxHeight: '20vw',
        overflowY: 'auto',
    },
});

const AddMenuItem = styled(MenuItem)({
    '&:hover': {
        backgroundColor: '#444',
    },
});

const Songs = ({ tracks }: SongsResultListProps) => {
    const navigate = useNavigate();
    const { data: user } = useGetCurrentUserProfile();
    const { data: playlistData } = useGetCurrentUserPlaylists({
        offset: 0,
    });

    const { mutate: addPlaylistItem } = useAddItemToPlaylist();

    const [IsAdd, setIsAdd] = useState<Boolean>(false);
    const [warning, setWarning] = useState<Boolean>(false);

    const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
    const [playlistId, setPlaylistId] = useState<string | null>(null);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, trackUri: string) => {
        // e.stopPropagation();
        if (user) {
            setAnchorEl(e.currentTarget);
            setSelectedTrack(trackUri);
        } else {
            setWarning(true);
        }
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const showPlaylist = (item) => {
        addPlaylistItem({ playlist_id: item.id, uris: [selectedTrack] });
        setPlaylistId(item.id);
        setIsAdd(true);
        closeMenu();
    };

    // 플리 추가 성공
    const refreshPlaylist = () => {
        setIsAdd(false);
        // if (playlistId) {
        //     navigate(`/playlist/${playlistId}`);
        // }
    };

    // 로그인 경고
    const closeAlert = () => {
        setWarning(false);
    };

    return (
        <div style={{ display: 'flex', width: '100%', gap: '20px' }}>
            <TopResultContainer>
                <Typography variant="h1" fontWeight={700}>
                    Top Result
                </Typography>
                <TopResultSubContainer>
                    <TopResultDiv>
                        <div style={{ marginTop: '5px', marginLeft: '7px' }}>
                            <CoverImage
                                src={tracks[0]?.album?.images[0].url}
                                style={{
                                    width: '90px',
                                    height: '90px',
                                    marginBottom: '10px',
                                }}
                            ></CoverImage>
                            <EllipsisTypography variant="h1">{tracks[0]?.name}</EllipsisTypography>
                            <EllipsisTypography variant="body2">
                                {tracks[0]?.artists[0]?.name ? 'Song • ' + tracks[0]?.artists[0]?.name : 'No Artists'}
                            </EllipsisTypography>
                        </div>
                        <ButtonDiv className="btnDiv">
                            <PlayButton />
                        </ButtonDiv>
                    </TopResultDiv>
                </TopResultSubContainer>
            </TopResultContainer>
            <SongsContainer>
                <Typography variant="h1" fontWeight={700} style={{ marginBottom: '10px' }}>
                    Songs
                </Typography>
                <Snackbar
                    open={IsAdd}
                    autoHideDuration={1500}
                    message="Added to Playlist!"
                    onClose={() => refreshPlaylist()}
                />
                <Snackbar
                    open={warning}
                    autoHideDuration={1500}
                    message="로그인을 해주세요."
                    onClose={() => closeAlert()}
                />
                <Table style={{ width: '100%' }}>
                    <TableBody>
                        {tracks.slice(0, 4).map((track) => (
                            <SongsTableRow key={track.id} sx={{ height: '40px' }}>
                                <SongTableCell>
                                    <Box display="flex" alignItems="center" borderRadius={'8px'}>
                                        <Box>
                                            <CoverImage
                                                src={track.album?.images[0].url}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                }}
                                            ></CoverImage>
                                        </Box>
                                        <Box sx={{ maxWidth: '230px' }}>
                                            <EllipsisTypography variant="body2" fontWeight={700}>
                                                {track.name}
                                            </EllipsisTypography>
                                            <EllipsisTypography variant="body2" color="text.secondary">
                                                {track.artists[0]?.name}
                                            </EllipsisTypography>
                                        </Box>
                                    </Box>
                                </SongTableCell>
                                <SongTableCell>
                                    <AddButton
                                        className="addBtn"
                                        sx={{
                                            visibility: 'hidden',
                                            cursor: 'pointer',
                                        }}
                                        onClick={(e) => handleMenuOpen(e, track.uri)}
                                    />
                                    <AddMenu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={closeMenu}
                                        PaperProps={{
                                            sx: {
                                                maxHeight: 200,
                                                overflowY: 'auto',
                                                '&::-webkit-scrollbar': { display: 'none' },
                                                scrollbarWidth: 'none',
                                                msOverflowStyle: 'none',
                                            },
                                        }}
                                        keepMounted
                                        disableEnforceFocus
                                        transitionDuration={0} // close시 리스트스크롤 상단으로 올라가는 문제 방지
                                    >
                                        {playlistData?.pages[0].items.map((item, idx) => (
                                            <AddMenuItem
                                                key={idx}
                                                sx={{ width: '200px' }}
                                                onClick={() => showPlaylist(item)}
                                            >
                                                <EllipsisTypography sx={{ width: '100%' }}>
                                                    {item?.name}
                                                </EllipsisTypography>
                                            </AddMenuItem>
                                        ))}
                                    </AddMenu>
                                </SongTableCell>
                                <SongTableCell>{format(track.duration_ms, 'mm:ss') || 'Unknown'}</SongTableCell>
                            </SongsTableRow>
                        ))}
                    </TableBody>
                </Table>
            </SongsContainer>
        </div>
    );
};
export default Songs;
