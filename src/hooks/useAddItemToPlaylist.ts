import React from 'react';
import useGetCurrentUserProfile from './useGetCurrentUserProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddItemsToPlaylistRequest } from '../models/playlist';
import { addItemsToPlaylist } from '../apis/playlistApi';

const useAddItemToPlaylist = () => {
    const queryClient = useQueryClient();
    const { data: user } = useGetCurrentUserProfile();

    return useMutation({
        mutationFn: (params: AddItemsToPlaylistRequest) => {
            if (user) {
                return addItemsToPlaylist(params);
            }
            return Promise.reject(new Error('user is not defined'));
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['playlist-detail', variables.playlist_id] });

            queryClient.invalidateQueries({
                queryKey: ['playlist-items'],
                exact: false,
            });

            queryClient.invalidateQueries({
                queryKey: ['current-user-playlists'],
                exact: false,
            });
        },
    });
};

export default useAddItemToPlaylist;
