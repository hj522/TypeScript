import { Grid, Typography } from '@mui/material';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Loading from '../../../common/components/Loading';
import useGetSeveralAlbums from '../../../hooks/useGetSeveralAlbums';
import Card from '../../../common/components/Card';
import SpotifyLogo from '../../../common/components/Spotify_icon.png';

const SeveralAlbums = () => {
    const { data, isLoading, error } = useGetSeveralAlbums();

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage errorMessage={error.message} />;

    return (
        <div>
            <Typography variant="h1" paddingTop="8px" marginBottom="10px">
                Albums
            </Typography>
            {data && data.albums.length > 0 ? (
                <Grid container spacing={2}>
                    {data.albums.map((album) => (
                        <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
                            <Card
                                image={album.images[0]?.url || SpotifyLogo}
                                name={album.name}
                                artistName={album.artists[0]?.name || 'Unknown Artist'}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h2">No data</Typography>
            )}
        </div>
    );
};

export default SeveralAlbums;
