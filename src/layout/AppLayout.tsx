import { Box, styled, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistHead from './components/PlaylistHead';
import Playlist from './components/Playlist';
import Navbar from './components/Navbar';
import { Suspense } from 'react';
import Loading from '../common/components/Loading';

const Layout = styled('div')({
    display: 'flex',
    height: '100vh',
    padding: '8px',
});

const Sidebar = styled('div')(({ theme }) => ({
    width: '331px',
    height: '100%', // 100vh
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: '100%',
    padding: '8px',
    marginBottom: '8px',
    marginRight: '8px',
}));

const PlaylistBox = styled(Box)(({ theme }) => ({
    height: '100%',
    borderRadius: '8px',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    paddingTop: '8px',
    marginBottom: '8px',
    marginRight: '8px',
}));

const NavList = styled('ul')({
    listStyle: 'none',
    padding: 10,
    margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '5px',
    color: theme.palette.text.secondary,
    '&:hover': {
        color: theme.palette.text.primary,
    },
    '&:active': {
        color: theme.palette.text.primary,
    },
    '&.active': {
        color: theme.palette.text.primary,
    },
}));

const AppLayout = () => {
    return (
        <Layout>
            <Sidebar>
                {/* 홈,서치 */}
                <ContentBox>
                    <NavList>
                        <StyledNavLink to="/">
                            <HomeIcon />
                            <Typography variant="h2" fontWeight={700}>
                                Home
                            </Typography>
                        </StyledNavLink>
                        <StyledNavLink to="/search">
                            <SearchIcon />
                            <Typography variant="h2" fontWeight={700}>
                                Search
                            </Typography>
                        </StyledNavLink>
                    </NavList>
                </ContentBox>
                {/* 플레이리스트 */}
                <PlaylistBox>
                    <PlaylistHead />
                    <Playlist />
                </PlaylistBox>
            </Sidebar>
            <ContentBox>
                <Navbar />
                <Outlet />
            </ContentBox>
        </Layout>
    );
};

export default AppLayout;
