import { Track } from '../../../models/track';
import { SimplifiedAlbum } from '../../../models/album';
import { Artist } from '../../../models/artist';
import Songs from './Songs';
import Artists from './Artists';
import Albums from './Albums';
import { styled } from '@mui/material';

interface SearchResultListProps {
    tracks: Track[];
    albums: SimplifiedAlbum[];
    artists: Artist[];
}

const ResultContainer = styled('div')({
    width: '100%',
});

const SearchResults = ({ tracks, albums, artists }: SearchResultListProps) => {
    return (
        <ResultContainer>
            <Songs tracks={tracks} />
            <Artists artists={artists} />
            <Albums albums={albums} />
        </ResultContainer>
    );
};
export default SearchResults;
