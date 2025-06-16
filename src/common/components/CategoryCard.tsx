import { styled, Typography } from '@mui/material';

interface CategoryCardProps {
    name: string | undefined;
    image: string | undefined;
}

const CategoryCardContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    height: '200px',
    backgroundColor: getRandomColor(),
    cursor: 'pointer',
    borderRadius: '10px',
    overflow: 'hidden',
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
        border: '3px solid #1ed760',
    },
    '&:hover img': {
        transform: 'rotate(20deg) scale(1.05)',
        transition: 'transform 0.3s ease',
    },
}));

const CategoryImage = styled('img')({
    width: '50%',
    maxWidth: '160px',
    height: 'auto',
    position: 'absolute',
    right: '10px',
    bottom: '0px',
    objectFit: 'cover',
    borderRadius: '6px',
    transform: 'rotate(15deg)',
    transition: 'transform 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
});

const CategoryTitle = styled(Typography)({
    fontWeight: '700',
    marginLeft: '25px',
    zIndex: 2,
});

const getRandomColor = () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
};

const CategoryCard = ({ image, name }: CategoryCardProps) => {
    return (
        <CategoryCardContainer>
            <CategoryTitle variant="h2">{name || 'No name'}</CategoryTitle>
            <CategoryImage src={image} alt={name}></CategoryImage>
        </CategoryCardContainer>
    );
};

export default CategoryCard;
