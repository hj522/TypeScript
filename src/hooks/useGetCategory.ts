import { getCategory } from '../apis/categoryApi';
import useClientCredentialToken from './useClientCredentialToken';
import { useQuery } from '@tanstack/react-query';

const useGetCategory = () => {
    const clientCredentialToken = useClientCredentialToken();
    return useQuery({
        queryKey: ['browse-categories'],
        queryFn: () => {
            if (!clientCredentialToken) {
                throw new Error('No token available');
            }
            return getCategory(clientCredentialToken);
        },
    });
};

export default useGetCategory;
