import { Avatar, ListItemIcon, Menu, MenuItem, styled } from '@mui/material';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import Loading from '../../common/components/Loading';
import BasicAvatar from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import useUserLogout from '../../hooks/useUserLogout';

const ProfileContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: '8px',
    // width: '100%',
});

const ProfileImg = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
});

const Navbar = () => {
    const { data: userProfile, isLoading } = useGetCurrentUserProfile();
    const logout = useUserLogout();

    // 메뉴가 열릴 위치의 기준이 됨
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // null 또는 HTML Element
    const open = Boolean(anchorEl);

    if (isLoading) {
        return <Loading />;
    }

    // 프로필 클릭
    const openMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget); // 클릭한 html 요소 저장
    };

    // menu 닫기
    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <ProfileContainer>
            {userProfile ? (
                <ProfileImg>
                    <Avatar onClick={openMenu} src={userProfile.images[0]?.url}>
                        {!userProfile.images[0] && <BasicAvatar />}
                    </Avatar>
                    <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                        <MenuItem onClick={logout}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Log out
                        </MenuItem>
                    </Menu>
                </ProfileImg>
            ) : (
                <LoginButton />
            )}
        </ProfileContainer>
    );
};

export default Navbar;
