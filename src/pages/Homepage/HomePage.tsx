import { styled } from '@mui/material';
import NewReleases from './components/NewReleases';
import Albums from './components/Albums';
import Tracks from './components/Tracks';
import RecentlyPlayedTracks from './components/RecentlyPlayedTracks';

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
    const accessToken = localStorage.getItem('access_token');

    return (
        <HomeContainer>
            <NewReleases />
            {accessToken ? <RecentlyPlayedTracks /> : null}
            {/* <Tracks />
            <Albums /> */}
        </HomeContainer>
    );
};

export default HomePage;
