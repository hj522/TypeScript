import { Box, styled, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { Track } from '../../../models/track';
import { format } from 'date-fns';

interface SongsResultListProps {
    tracks: Track[];
}

const TopResultContainer = styled('div')(({ theme }) => ({
    width: '50%',
    height: '275px',
    // border: 'solid 2px blue',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 'auto',
    },
}));

const SongsContainer = styled('div')(({ theme }) => ({
    width: '50%',
    height: '275px',
    // border: 'solid 2px orange',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 'auto',
    },
}));

const CoverImage = styled('img')({
    borderRadius: '4px',
    marginRight: '12px',
});

const ResultBox = styled(Box)({
    marginLeft: '23px',
});

const EllipsisTypography = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis ',
    marginBottom: '3px',
});

const SongTableCell = styled(TableCell)({
    padding: '6px',
    borderBottom: 'none',
});

const Songs = ({ tracks }: SongsResultListProps) => {
    // console.log('tracks', tracks);

    return (
        <div style={{ display: 'flex', width: '100%', gap: '20px' }}>
            <TopResultContainer>
                <Typography variant="h1" fontWeight={700} style={{ marginBottom: '20px' }}>
                    Top Result
                </Typography>
                <ResultBox>
                    <CoverImage
                        src={tracks[0]?.album?.images[0].url}
                        style={{
                            width: '90px',
                            height: '90px',
                        }}
                    ></CoverImage>
                    <EllipsisTypography variant="h1">{tracks[0]?.name}</EllipsisTypography>
                    <EllipsisTypography variant="body2">
                        {tracks[0]?.artists[0]?.name ? 'Song • ' + tracks[0]?.artists[0]?.name : 'No Artists'}
                    </EllipsisTypography>
                </ResultBox>
            </TopResultContainer>
            <SongsContainer>
                <Typography variant="h1" fontWeight={700} style={{ marginBottom: '20px' }}>
                    Songs
                </Typography>
                <Table style={{ width: '100%' }}>
                    <TableBody>
                        {tracks.slice(0, 4).map((track) => (
                            <TableRow key={track.id} sx={{ height: '40px' }}>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SongsContainer>
        </div>
    );
};
export default Songs;
