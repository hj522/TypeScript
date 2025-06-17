import { Grid, styled, Typography } from '@mui/material';
import { SimplifiedAlbum } from '../../../models/album';
import Card from '../../../common/components/Card';

interface AlbumResultListProps {
    albums: SimplifiedAlbum[];
}

const AlbumContainer = styled('div')(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 'auto',
    },
}));

const Albums = ({ albums }: AlbumResultListProps) => {
    // console.log('albums', albums);
    return (
        <AlbumContainer>
            <Typography variant="h1" fontWeight={700} mb={2}>
                Albums
            </Typography>
            <Grid container spacing={2}>
                {albums.slice(0, 6).map((item) => (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.id}>
                        <Card image={item.images[0].url} name={item.name} artistName={item.artists[0]?.name} />
                    </Grid>
                ))}
            </Grid>
        </AlbumContainer>
    );
};

export default Albums;
