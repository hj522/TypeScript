import { styled } from '@mui/material';
import { Track } from '../../../models/track';

interface SongsResultListProps {
    tracks: Track[];
}

const TopResultContainer = styled('div')({
    width: '50%',
});

const TopResult = ({ tracks }: SongsResultListProps) => {
    return <TopResultContainer>TopResult</TopResultContainer>;
};

export default TopResult;
