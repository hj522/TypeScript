import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Search, Bookmark } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';

const Mobilebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <BottomNavigation
            showLabels
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 999,
                bgcolor: 'black',
                borderTop: '1px solid #333',
            }}
            value={location.pathname}
            onChange={(_, newVal) => navigate(newVal)}
        >
            <BottomNavigationAction label="Home" value="/" icon={<Home />} sx={{ color: 'white' }} />
            <BottomNavigationAction label="Search" value="/search" icon={<Search />} sx={{ color: 'white' }} />
            <BottomNavigationAction label="Library" value="/playlist" icon={<Bookmark />} sx={{ color: 'white' }} />
        </BottomNavigation>
    );
};

export default Mobilebar;
