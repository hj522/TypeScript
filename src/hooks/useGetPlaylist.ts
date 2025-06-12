import { useQuery } from '@tanstack/react-query';
import { getPlaylistRequest } from '../models/playlist';
import { getPlaylist } from '../apis/playlistApi';

const useGetPlaylist = (params: getPlaylistRequest) => {
    return useQuery({
        queryKey: ['playlist-detail', params.playlist_id],
        queryFn: () => {
            return getPlaylist(params);
        },
        retry: false,
        // id값이 있을 때만 호출
        enabled: !!params.playlist_id,
    });
};

export default useGetPlaylist;
