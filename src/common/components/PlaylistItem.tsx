import { PlaylistProps } from '../../models/playlist';
import { Avatar, ListItemButton, styled, Typography } from '@mui/material';
import PlaylistIcon from '@mui/icons-material/LibraryMusicOutlined';

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

const PlaylistItem = ({ id, name, artist, image }): PlaylistProps => {
    return (
        <PlaylistItemContainer>
            <PlaylistImg>
                {image ? (
                    <img
                        src={image}
                        alt={name}
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
                    {name}
                </Typography>
                <Typography>{artist}</Typography>
            </PlaylistText>
        </PlaylistItemContainer>
    );
};

export default PlaylistItem;
