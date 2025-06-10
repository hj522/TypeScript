import { PlaylistTrack } from '../../../models/playlist';
import { styled, TableCell, TableRow } from '@mui/material';
import { Episode, Track } from '../../../models/track';
import { format } from 'date-fns';

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

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
    const isEpisode = (track: Track | Episode): track is Episode => {
        return 'description' in track; // description이 있으면 Episode, 그게 아니라면 false
    };

    return (
        <PlaylistItemTableRow>
            <PlaylistItemTableCell>{index}</PlaylistItemTableCell>
            <PlaylistItemTableCell>{item.track.name || 'no name'}</PlaylistItemTableCell>
            <PlaylistItemTableCell>{isEpisode(item.track) ? 'N/A' : item.track.album?.name}</PlaylistItemTableCell>
            {/* <TableCell>{item.track.album?.name}</TableCell> */}
            <PlaylistItemTableCell>{format(new Date(item?.added_at), 'yyyy-MM-dd') || 'Unknown'}</PlaylistItemTableCell>
            <PlaylistItemTableCell>{format(item.track.duration_ms, 'mm:ss') || 'Unknown'}</PlaylistItemTableCell>
        </PlaylistItemTableRow>
    );
};

export default DesktopPlaylistItem;
