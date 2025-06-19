import { useQuery } from '@tanstack/react-query';
import useClientCredentialToken from './useClientCredentialToken';
import { getSeveralArtists } from '../apis/artistApi';

const ARTIST_IDS = [
    '66CXWjxzNUsdJxJ2JdwvnR',
    '41MozSoPIsD1dJM0CLPjZF',
    '0du5cEVh5yTK9QJze8zA0C',
    '3Nrfpe0tUJi4K4DXYWgMUX',
    '6HvZYsbFfjnjFrWF950C9d',
    '3HqSLMAZ3g3d5poNaI7GOU',
];

const useGetSeveralArtists = () => {
    const clientCredentialToken = useClientCredentialToken();

    return useQuery({
        queryKey: ['several-artists', ARTIST_IDS],
        queryFn: () => {
            if (!clientCredentialToken) {
                throw new Error('No access token');
            }
            return getSeveralArtists(ARTIST_IDS, clientCredentialToken);
        },
        enabled: !!clientCredentialToken,
    });
};

export default useGetSeveralArtists;
