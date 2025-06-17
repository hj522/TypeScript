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
