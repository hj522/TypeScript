import { Avatar, styled } from '@mui/material';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import Loading from '../../common/components/Loading';

const ProfileContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

const ProfileImg = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
});

const Navbar = () => {
    const { data: userProfile, isLoading } = useGetCurrentUserProfile();

    if (isLoading) {
        return <div style={{ height: '6%' }} />;
    }

    return userProfile ? (
        <ProfileContainer>
            <ProfileImg>
                {userProfile.images[0] ? (
                    <Avatar src={userProfile.images[0]?.url} />
                ) : (
                    <Avatar src="../../common/components/spotify_basic_profile.png" />
                )}
            </ProfileImg>
        </ProfileContainer>
    ) : (
        <LoginButton />
    );
};

export default Navbar;
