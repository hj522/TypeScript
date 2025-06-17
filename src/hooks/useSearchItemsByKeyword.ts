import { useInfiniteQuery } from '@tanstack/react-query';
import { searchItemsByKeyword } from '../apis/searchApi';
import { SearchRequestParams } from '../models/search';
import useClientCredentialToken from './useClientCredentialToken';

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
    const clientToken = useClientCredentialToken();

    return useInfiniteQuery({
        queryKey: ['search', params],
        queryFn: ({ pageParam = 0 }) => {
            if (!clientToken) throw new Error('no token availble');
            return searchItemsByKeyword(clientToken, { ...params, offset: pageParam });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const nextPageUrl =
                lastPage.tracks?.next ||
                lastPage.artists?.next ||
                lastPage.albums?.next ||
                lastPage.playlists?.next ||
                lastPage.shows?.next ||
                lastPage.episodes?.next ||
                lastPage.audiobooks?.next;

            if (nextPageUrl) {
                const nextOffset = new URL(nextPageUrl).searchParams.get('offset');
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
        },
        enabled: !!params.q && !!clientToken,
    });
};

export default useSearchItemsByKeyword;
