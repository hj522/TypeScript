import { PlaylistTrack } from '../../../models/playlist';
import { Avatar, ListItemButton, styled, TableCell, TableRow, Typography } from '@mui/material';
import { Episode, Track } from '../../../models/track';
import { format } from 'date-fns';
import useChangeMobileVer from '../../../hooks/useChangeMobileVer';
import PlaylistIcon from '@mui/icons-material/LibraryMusicOutlined';

interface DesktopPlaylistItemProps {
    index: number;
    item: PlaylistTrack;
}

const PlaylistItemTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const PlaylistItemTableCell = styled(TableCell)({
    borderBottom: 'none',
});

const PlaylistItemContainer = styled(ListItemButton)(({ theme }) => ({
    alignItems: 'center',
    padding: '12px',
    gap: '15px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const PlaylistImg = styled(Avatar)({
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    backgroundColor: 'white',
});

const PlaylistText = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
    const isMobileVer = useChangeMobileVer();

    const isEpisode = (track: Track | Episode): track is Episode => {
        return 'description' in track; // description이 있으면 Episode, 그게 아니라면 false
    };

    return isMobileVer ? (
        <PlaylistItemContainer>
            <PlaylistImg>
                {item.track.album?.images[0] ? (
                    <img
                        src={item.track.album.images[0].url}
                        alt={item.track.name}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                ) : (
                    <PlaylistIcon />
                )}
            </PlaylistImg>
            <PlaylistText>
                <Typography variant="body1" fontWeight={700} color={'#1ed760'}>
                    {item.track.name}
                </Typography>
                <Typography color="text.secondary">{item.track.artists[0].name}</Typography>
            </PlaylistText>
        </PlaylistItemContainer>
    ) : (
        <PlaylistItemTableRow>
            <PlaylistItemTableCell>{index}</PlaylistItemTableCell>
            <PlaylistItemTableCell>{item.track.name || 'no name'}</PlaylistItemTableCell>
            <PlaylistItemTableCell>{isEpisode(item.track) ? 'N/A' : item.track.album?.name}</PlaylistItemTableCell>
            <PlaylistItemTableCell>{format(new Date(item?.added_at), 'yyyy-MM-dd') || 'Unknown'}</PlaylistItemTableCell>
            <PlaylistItemTableCell>{format(item.track.duration_ms, 'mm:ss') || 'Unknown'}</PlaylistItemTableCell>
        </PlaylistItemTableRow>
    );
};

export default DesktopPlaylistItem;
