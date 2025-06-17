import { styled, Typography } from '@mui/material';
import PlayButton from './PlayButton';

interface ArtistCardProps {
    image: string;
    artistName: string | undefined;
}

const ArtistCardContainer = styled('div')(({ theme }) => ({
    width: '100%',
    minWidth: '170px',
    height: '100%',
    borderRadius: '5px',
    padding: '10px',
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
    borderRadius: '50%',
    height: 'auto',
    marginBottom: '5px',
});

const AlbumTypography = styled(Typography)({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
});

const ButtonDiv = styled('div')({
    position: 'absolute',
    top: '95%',
    right: '5%',
    opacity: '0',
    transition: 'opacity 0.2s ease-in-out',
});

const ArtistCard = ({ image, artistName }: ArtistCardProps) => {
    return (
        <ArtistCardContainer>
            <div style={{ position: 'relative' }}>
                <ImageContainer src={image} />
                <ButtonDiv className="btnDiv">
                    <PlayButton />
                </ButtonDiv>
            </div>
            <AlbumTypography className="titleTypo" variant="h2" fontWeight={700}>
                {artistName || 'Untitled'}
            </AlbumTypography>
            <AlbumTypography className="artistTypo" color="text.secondary">
                Artist
            </AlbumTypography>
        </ArtistCardContainer>
    );
};

export default ArtistCard;
