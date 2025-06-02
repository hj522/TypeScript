import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, styled, Typography } from '@mui/material';

const PlaylistHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    color: theme.palette.text.primary,
    padding: '8px',
    alignItems: 'center',
}));

const PlaylistHead = () => {
    return (
        <PlaylistHeader>
            <Box display="flex">
                <BookmarkIcon />
                <Typography variant="h2" fontWeight={700}>
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
