import { styled, Typography } from '@mui/material';
import PlayButton from './PlayButton';

interface CardProps {
    name: string;
    image: string;
    artistName: string | undefined;
}

const CardContainer = styled('div')(({ theme }) => ({
    width: '100%',
    minWidth: '170px',
    height: 'auto',
    borderRadius: '5px',
    padding: '8px',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover .btnDiv': {
        opacity: 1,
    },
    '&:hover .titleTypo': {
        color: '#1ed760',
    },
    '&:hover .artistTypo': {
        color: theme.palette.text.primary,
    },
}));

const ImageContainer = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    marginBottom: '5px',
});

const AlbumTypography = styled(Typography)({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
});

const ButtonDiv = styled('div')({
    position: 'absolute',
    top: '60%',
    right: '7%',
    opacity: '0',
    transition: 'opacity 0.2s ease-in-out',
});

const Card = ({ image, name, artistName }: CardProps) => {
    return (
        <CardContainer>
            <div style={{ position: 'relative' }}>
                <ImageContainer src={image} />
                <ButtonDiv className="btnDiv">
                    <PlayButton />
                </ButtonDiv>
            </div>
            <AlbumTypography className="titleTypo" variant="h2" fontWeight={700}>
                {name || 'Untitled'}
            </AlbumTypography>
            <AlbumTypography className="artistTypo" color="text.secondary">
                {artistName || 'No artist'}
            </AlbumTypography>
        </CardContainer>
    );
};

export default Card;
