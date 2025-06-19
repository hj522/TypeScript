import { styled } from '@mui/material';
import NewReleases from './components/NewReleases';
import RecentlyPlayedTracks from './components/RecentlyPlayedTracks';
import SeveralAlbums from './components/SeveralAlbums';
import SeveralArtists from './components/SeveralArtists';

const HomeContainer = styled('div')({
    height: 'calc(100% - 64px)',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
});

const HomePage = () => {
    const accessToken = localStorage.getItem('access_token') || '';

    return (
        <HomeContainer>
            <NewReleases />
            {accessToken ? <RecentlyPlayedTracks /> : null}
            <SeveralAlbums />
            <SeveralArtists />
        </HomeContainer>
    );
};

export default HomePage;
