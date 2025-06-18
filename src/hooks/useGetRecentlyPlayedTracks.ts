import { useQuery } from '@tanstack/react-query';
import { getRecentlyPlayedTracks } from '../apis/trackApi';
import { GetPlayedTracksRequest } from '../models/track';

const useGetRecentlyPlayedTracks = (params: GetPlayedTracksRequest) => {
    const accessToken = localStorage.getItem('access_token');

    return useQuery({
        queryKey: ['recently-played-tracks', params],
        queryFn: async () => {
            if (!accessToken) {
                throw new Error('No token available');
            }
            return getRecentlyPlayedTracks(accessToken, params);
        },
    });
};

export default useGetRecentlyPlayedTracks;
