import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Avatar, styled, Typography } from '@mui/material';
import PlaylistIcon from '@mui/icons-material/LibraryMusicOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import ErrorMessage from '../../common/components/ErrorMessage';
import Loading from '../../common/components/Loading';

const DetailContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height: '200px',
    marginTop: '20px',
    padding: '30px',
    borderRadius: '8px',
    border: 'solid 3px #1ed760',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
}));

const DetailAlbumImg = styled(Avatar)({
    width: '130px',
    height: '130px',
    borderRadius: '8px',
    backgroundColor: 'white',
});

const DetailInfoText = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '40px',
});

const PlaylistDetailPage = () => {
    const { id } = useParams<{ id: string }>(); //제네릭 -> 정확하게어떤값을받을지알수있음
    if (id === undefined) return <Navigate to="/" />;

    const { data: playlist, error, isLoading } = useGetPlaylist({ playlist_id: id });
    console.log('플리 ', playlist);

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <ErrorMessage errorMessage={error.message} />;
    }

    return (
        <DetailContainer>
            <DetailAlbumImg>
                {playlist?.images ? (
                    <img
                        src={playlist?.images[0].url}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    ></img>
                ) : (
                    <PlaylistIcon fontSize="large" />
                )}
            </DetailAlbumImg>
            <DetailInfoText>
                <Typography variant="h1" fontWeight={700} style={{ marginBottom: '5px' }}>
                    {playlist?.name}
                </Typography>
                <Typography variant="h2" fontWeight={500}>
                    <MusicNoteOutlinedIcon sx={{ fontSize: 'small', verticalAlign: 'middle', color: '#1ed760' }} />
                    {playlist?.owner?.display_name + ' • ' + playlist?.tracks.total + ' songs '}
                </Typography>
            </DetailInfoText>
        </DetailContainer>
    );
};

export default PlaylistDetailPage;
