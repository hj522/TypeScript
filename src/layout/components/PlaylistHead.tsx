import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, styled, Typography } from '@mui/material';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';

const PlaylistHeader = styled('div')({
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
    justifyContent: 'space-between',
});

const PlaylistHead = () => {
    // 새 플레이리스트 추가
    const { mutate: createPlaylist } = useCreatePlaylist();

    const handleCreatePlaylist = () => {
        createPlaylist({ name: '나의 플레이 리스트' });
    };

    return (
        <PlaylistHeader>
            <Box display="flex">
                <BookmarkIcon style={{ marginLeft: 14 }} />
                <Typography variant="h2" fontWeight={700} style={{ marginLeft: 20 }}>
                    Your Library
                </Typography>
            </Box>
            <Button onClick={handleCreatePlaylist}>
                <AddIcon style={{ color: '#1ed760' }} />
            </Button>
        </PlaylistHeader>
    );
};

export default PlaylistHead;
