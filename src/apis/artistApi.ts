import axios from 'axios';
import { REACT_APP_SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { GetSeveralArtistsResponse } from '../models/artist';

export const getSeveralArtists = async (
    artistIds: string[],
    accessToken: string
): Promise<GetSeveralArtistsResponse> => {
    try {
        const idsParam = artistIds.join(',');
        const response = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/artists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                ids: idsParam,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to fetch artists');
    }
};
