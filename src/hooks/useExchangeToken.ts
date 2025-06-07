import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exchangeToken } from '../apis/authApi';
import { ExchangeTokenResponse } from '../models/auth';

const useExchangeToken = () => {
    const queryClient = useQueryClient();

    // <응답값 타입, 에러, mutation함수 파라미터값>
    return useMutation<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
        mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token);
            queryClient.invalidateQueries({
                queryKey: ['current-user-profile'], //무효화
            });
        },
    });
};

export default useExchangeToken;
