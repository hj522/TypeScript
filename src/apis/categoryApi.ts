import axios from 'axios';
import { REACT_APP_SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { getCategoryResponse } from '../models/category';

export const getCategory = async (clientCredentialToken: string): Promise<getCategoryResponse> => {
    try {
        const response = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/browse/categories`, {
            headers: {
                Authorization: `Bearer ${clientCredentialToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to fetch Categories');
    }
};

// 특정 카테고리의 플레이리스트 목록
export const getPlaylistsByCategory = async (categoryId: string, token: string) => {
    const response = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/browse/categories/${categoryId}/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 5 },
    });
    return response.data;
};

// 특정 플레이리스트의 트랙 목록
export const getTracksByPlaylistId = async (playlistId: string, token: string) => {
    const response = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 10 },
    });
    return response.data;
};
