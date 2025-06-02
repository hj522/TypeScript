import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const PlaylistBox = styled(Box)(({ theme }) => ({
    borderRadius: '8px',
    backgroundColor: '#242424',
    color: theme.palette.text.second,
    width: '100%',
    padding: '8px',
    marginBottom: '8px',
    marginRight: '8px',
}));

const CreateBtn = styled(Button)({
    marginTop: '20px',
    fontWeight: '700',
});

const EmptyPlaylist = () => {
    return (
        <div>
            <PlaylistBox>
                <Typography>Create your first Playlist.It's easy, we'll help you.</Typography>
                <CreateBtn>Create Playlist</CreateBtn>
            </PlaylistBox>
        </div>
    );
};

export default EmptyPlaylist;
