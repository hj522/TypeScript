import { Grid, InputAdornment, styled, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useGetCategory from '../../hooks/useGetCategory';
import Loading from '../../common/components/Loading';
import CategoryCard from '../../common/components/CategoryCard';

const SearchContainer = styled('div')({
    width: '100%',
    height: '100%',
    padding: '15px',
});

const CategoryContainer = styled('div')({
    width: '100%',
    height: 'auto',
    // backgroundColor: 'grey',
});

const SearchPage = () => {
    const { data, isLoading } = useGetCategory();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <SearchContainer>
            <TextField
                placeholder="찾으시는 음악이 있으신가요?"
                style={{
                    width: '430px',
                    marginBottom: '23px',
                    backgroundColor: '#333333',
                    borderRadius: '30px',
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon style={{ color: 'white' }} />
                        </InputAdornment>
                    ),
                    style: {
                        borderRadius: 30,
                    },
                }}
            />
            <CategoryContainer>
                <Typography variant="h1" fontWeight={700} marginBottom={'10px'}>
                    Browse All
                </Typography>
                {data && data.categories.items.length > 0 ? (
                    <Grid container spacing={2}>
                        {data.categories.items.map((category) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
                                <CategoryCard image={category.icons[0].url} name={category.name} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h2">No Data</Typography>
                )}
            </CategoryContainer>
        </SearchContainer>
    );
};

export default SearchPage;
