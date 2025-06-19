import axios from 'axios';
import {
    AddItemsToPlaylistRequest,
    AddItemsToPlaylistResponse,
    CreatePlaylistRequest,
    GetCurrentUserPlaylistRequest,
    GetCurrentUserPlaylistResponse,
    GetFeaturedPlaylistsResponse,
    getPlaylistItemsRequest,
    getPlaylistItemsResponse,
    getPlaylistRequest,
    Playlist,
} from '../models/playlist';
import api from '../utils/api';
import { REACT_APP_SPOTIFY_BASE_URL } from '../configs/commonConfig';

export const getCurrentUserPlaylists = async ({
    limit,
    offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
    try {
        const response = await api.get(`/me/playlists`, {
            params: { limit, offset },
        });
        return response.data;
    } catch (error) {
        throw error;
        // throw new Error('fail to fetch current user playlists');
    }
};

export const getPlaylist = async (params: getPlaylistRequest): Promise<Playlist> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}`, {
            params: params,
        });
        return response.data;
    } catch (error) {
        throw error;
        // throw new Error('fail to fetch playlist detail');
    }
};

export const getPlaylistItems = async (params: getPlaylistItemsRequest): Promise<getPlaylistItemsResponse> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
            params,
        });
        return response.data;
    } catch (error) {
        throw error;
        // throw new Error('fail to fetch playlist items');
    }
};

export const createPlaylist = async (user_id: string, params: CreatePlaylistRequest): Promise<Playlist> => {
    try {
        const { name, playlistPublic, collaborative, description } = params;
        const response = await api.post(`/users/${user_id}/playlists`, {
            name,
            public: playlistPublic,
            collaborative,
            description,
        });
        return response.data;
    } catch (error) {
        throw error;
        // throw new Error('fail to create playlist');
    }
};

export const addItemsToPlaylist = async (params: AddItemsToPlaylistRequest): Promise<AddItemsToPlaylistResponse> => {
    try {
        const { uris, position } = params;
        const response = await api.post(`/playlists/${params.playlist_id}/tracks`, {
            uris,
            position,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
