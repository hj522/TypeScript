import { styled } from '@mui/material';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import EmptyPlaylist from './EmptyPlaylist';
import PlaylistItem from '../../common/components/PlaylistItem';
import Loading from '../../common/components/Loading';
import ErrorMessage from '../../common/components/ErrorMessage';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { PlaylistProps } from '../../models/playlist';
import { useNavigate } from 'react-router';

const PlaylistContainer = styled('div')(({ theme }) => ({
    height: '100%',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 240px)',
    '&::-webkit-scrollbar': {
        display: 'none',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        maxHeight: 'calc(100vh - 65px - 119px)',
    },
}));

// Library
const Playlist = ({ playlists }: PlaylistProps) => {
    // 무한스크롤 세팅
    const { ref, inView } = useInView();

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const navigate = useNavigate();
    const handleClick = (id: string) => {
        setSelectedId(id);
        navigate(`/playlist/${id}`);
    };

    const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({
        limit: 10,
        offset: 0,
    });
    // console.log('플레이리스트 >> ', data);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    const { data: user, isLoading: isUserLoading } = useGetCurrentUserProfile(); // 유저 정보 들고오기

    if (!user) return <EmptyPlaylist />;

    if (isLoading || isUserLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage errorMessage={error.message} />;
    }

    return (
        <div>
            {data && data.pages[0].total > 0 ? (
                <PlaylistContainer>
                    {data.pages.flatMap((page) =>
                        page.items.map((item, idx) => (
                            <PlaylistItem
                                handleClick={handleClick}
                                key={item.id + '-' + idx}
                                id={item.id}
                                name={item.name}
                                artist={item.type + ' • ' + (item.owner?.display_name || 'no artist')}
                                image={item.images?.[0]?.url || null}
                                selectedId={selectedId}
                            />
                        ))
                    )}
                    <div ref={ref} style={{ minHeight: '40px' }}>
                        {isFetchingNextPage && <Loading />}
                    </div>
                </PlaylistContainer>
            ) : (
                <EmptyPlaylist />
            )}
        </div>
    );
};

export default Playlist;
