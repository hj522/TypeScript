import { Track } from '../../models/track';
import { SimplifiedAlbum } from '../../models/album';
import { Artist } from '../../models/artist';
import Songs from './components/Songs';
import Artists from './components/Artists';
import Albums from './components/Albums';
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
            {tracks?.length > 0 && <Songs tracks={tracks} />}
            {artists?.length > 0 && <Artists artists={artists} />}
            {albums?.length > 0 && <Albums albums={albums} />}
        </ResultContainer>
    );
};
export default SearchResults;
