import { Grid, styled, Typography } from '@mui/material';
import { Artist } from '../../../models/artist';
import ArtistCard from '../../../common/components/ArtistCard';

interface ArtistsResultListProps {
    artists: Artist[];
}

const ArtistContainer = styled('div')(({ theme }) => ({
    width: '100%',
    height: '250px',
    marginBottom: '6px',
    border: 'solid 2px orange',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 'auto',
    },
}));

const Artists = ({ artists }: ArtistsResultListProps) => {
    // console.log('artists', artists);
    return (
        <ArtistContainer>
            <Typography variant="h1" fontWeight={700} mb={2}>
                Artists
            </Typography>
            <Grid container spacing={2}>
                {artists.slice(0, 6).map((item) => (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.id}>
                        <ArtistCard image={item.images[0].url} artistName={item.name}></ArtistCard>
                    </Grid>
                ))}
            </Grid>
        </ArtistContainer>
    );
};

export default Artists;
