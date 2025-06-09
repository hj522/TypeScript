import { Avatar, styled } from '@mui/material';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import Loading from '../../common/components/Loading';
import BasicAvatar from '@mui/icons-material/AccountCircle';

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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <ProfileContainer>
            {userProfile ? (
                <ProfileImg>
                    {userProfile.images[0] ? (
                        <Avatar src={userProfile.images[0]?.url} />
                    ) : (
                        <Avatar>
                            <BasicAvatar />
                        </Avatar>
                    )}
                </ProfileImg>
            ) : (
                <LoginButton />
            )}
        </ProfileContainer>
    );
};

export default Navbar;
