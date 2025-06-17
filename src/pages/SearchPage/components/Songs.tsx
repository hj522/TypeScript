import { Box, styled, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { Track } from '../../../models/track';
import { format } from 'date-fns';
import PlayButton from '../../../common/components/PlayButton';

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
    marginBottom: '3px',
});

const SongsTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '& .MuiTableCell-root': {
        borderBottom: 'none',
    },
}));

const SongTableCell = styled(TableCell)({
    padding: '6px',
});

const Songs = ({ tracks }: SongsResultListProps) => {
    // console.log('tracks', tracks);

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
