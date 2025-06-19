import { Box } from '@mui/material';
import PlaylistHead from '../../layout/components/PlaylistHead';
import Playlist from '../../layout/components/Playlist';

//모바일버전 플레이리스트 사이드바
const PlaylistPage = () => {
    return (
        <Box sx={{ px: 2, pt: 1, pb: 10 }}>
            <PlaylistHead />
            <Playlist />
        </Box>
    );
};

export default PlaylistPage;
