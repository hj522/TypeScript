import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { getCurrentUserPlaylists } from '../apis/playlistApi';
import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse } from '../models/playlist';

const useGetCurrentUserPlaylists = ({
    limit,
    offset,
}: GetCurrentUserPlaylistRequest): UseInfiniteQueryResult<
    InfiniteData<GetCurrentUserPlaylistResponse, Error>,
    Error
> => {
    return useInfiniteQuery({
        queryKey: ['current-user-playlists'],
        queryFn: ({ pageParam = 0 }) => {
            return getCurrentUserPlaylists({ limit, offset: pageParam });
        },
        retry: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            //GetCurrentUserPlaylistResponse값이 lastPage로 전달됨
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get('offset');
                return nextOffset ? parseInt(nextOffset) : undefined; //undefined -> 호출x 그대로 종료
            }
            return undefined;
        },
    });
};

export default useGetCurrentUserPlaylists;
