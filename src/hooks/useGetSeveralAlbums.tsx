import { useQuery } from '@tanstack/react-query';
import useClientCredentialToken from './useClientCredentialToken';
import { getSeveralAlbums } from '../apis/albumApi';

const ALBUM_IDS = [
    '0EhZEM4RRz0yioTgucDhJq',
    '3DmDoHxAeEiDFNWrHSKAdQ',
    '4TeDL95L9OTCpYnuQwlrwY',
    '087SnCtQCK0szSftQ2KYTF',
    '1HMLpmZAnNyl9pxvOnTovV',
    '3gHhPm8z8tid1kvpniUKuK',
];

const useGetSeveralAlbums = () => {
    const clientCredentialToken = useClientCredentialToken();

    return useQuery({
        queryKey: ['several-albums', ALBUM_IDS],
        queryFn: () => {
            if (!clientCredentialToken) {
                throw new Error('No access token');
            }
            return getSeveralAlbums(ALBUM_IDS, clientCredentialToken);
        },
        enabled: !!clientCredentialToken,
    });
};

export default useGetSeveralAlbums;
