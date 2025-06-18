import axios from 'axios';
import { REACT_APP_SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { GetPlayedTracksRequest, GetPlayedTracksResponse } from '../models/track';

export const getRecentlyPlayedTracks = async (
    accessToken: string,
    params: GetPlayedTracksRequest
): Promise<GetPlayedTracksResponse> => {
    try {
        const response = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/me/player/recently-played`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: 6,
                before: params.before,
                // after: params.after,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to fetch albums');
    }
};
