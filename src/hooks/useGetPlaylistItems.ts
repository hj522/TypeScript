import { useInfiniteQuery } from '@tanstack/react-query';
import { getPlaylistItemsRequest } from '../models/playlist';
import { getPlaylistItems } from '../apis/playlistApi';

const useGetPlaylistItems = (params: getPlaylistItemsRequest) => {
    return useInfiniteQuery({
        queryKey: ['playlist-items', params],
        queryFn: ({ pageParam }) => {
            return getPlaylistItems({ ...params, offset: pageParam });
        },
        retry: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get('offset');
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
            return undefined;
        },
    });
};

export default useGetPlaylistItems;
