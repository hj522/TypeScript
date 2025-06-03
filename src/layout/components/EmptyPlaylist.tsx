import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const PlaylistBox = styled(Box)(({ theme }) => ({
    width: '90%',
    padding: '20px',
    marginLeft: '17px',
    borderRadius: '8px',
    backgroundColor: '#242424',
    color: theme.palette.text.secondary,
}));

const CreateBtn = styled(Button)(({ theme }) => ({
    marginTop: '20px',
    fontWeight: '700',
    '&:hover': {
        color: theme.palette.text.primary,
    },
    '&:active': {
        color: theme.palette.text.primary,
    },
}));

const EmptyPlaylist = () => {
    return (
        <PlaylistBox>
            <Typography variant="h2" fontWeight={700}>
                Create your first Playlist.
            </Typography>
            <Typography>It's easy, we'll help you.</Typography>
            <CreateBtn variant="contained">Create Playlist</CreateBtn>
        </PlaylistBox>
    );
};

export default EmptyPlaylist;
