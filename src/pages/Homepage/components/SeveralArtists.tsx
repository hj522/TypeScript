import useGetSeveralArtists from '../../../hooks/useGetSeveralArtists';
import Loading from '../../../common/components/Loading';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { Grid, Typography } from '@mui/material';
import ArtistCard from '../../../common/components/ArtistCard';
import SpotifyLogo from '../../../common/components/Spotify_icon.png';

const SeveralArtists = () => {
    const { data, isLoading, error } = useGetSeveralArtists();

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage errorMessage={error.message} />;

    return (
        <div>
            <Typography variant="h1" paddingTop="8px" marginBottom="10px">
                Artists
            </Typography>
            {data && data.artists.length > 0 ? (
                <Grid container spacing={2}>
                    {data &&
                        data.artists.map((artist) => (
                            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={artist.id}>
                                <ArtistCard image={artist?.images?.[0]?.url || SpotifyLogo} artistName={artist.name} />
                            </Grid>
                        ))}
                </Grid>
            ) : (
                <Typography variant="h2">No data</Typography>
            )}
        </div>
    );
};

export default SeveralArtists;
