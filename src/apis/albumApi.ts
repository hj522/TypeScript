import axios from 'axios';
import { REACT_APP_SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { GetNewReleasesResponse, GetSeveralAlbumsResponse } from '../models/album';

export const getNewReleases = async (clientCredentialToken: string): Promise<GetNewReleasesResponse> => {
    try {
        const response = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/browse/new-releases?limit=6`, {
            headers: {
                Authorization: `Bearer ${clientCredentialToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to fetch new releases');
    }
};

export const getSeveralAlbums = async (albumIds: string[], accessToken: string): Promise<GetSeveralAlbumsResponse> => {
    try {
        const idsParam = albumIds.join(',');
        const response = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/albums`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                ids: idsParam,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to fetch albums');
    }
};
