import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, styled, Typography } from '@mui/material';

const PlaylistHeader = styled('div')({
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
    justifyContent: 'space-between',
});

const PlaylistHead = () => {
    return (
        <PlaylistHeader>
            <Box display="flex">
                <BookmarkIcon style={{ marginLeft: 14 }} />
                <Typography variant="h2" fontWeight={700} style={{ marginLeft: 20 }}>
                    Your Library
                </Typography>
            </Box>
            <Button>
                <AddIcon style={{ color: '#1ed760' }} />
            </Button>
        </PlaylistHeader>
    );
};

export default PlaylistHead;
