import { useEffect } from 'react';
import useExchangeToken from './hooks/useExchangeToken';
import { useNavigate } from 'react-router';
import Loading from './common/components/Loading';

const AppCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');
    const { mutate: exchangeToken } = useExchangeToken();

    const navigate = useNavigate();

    useEffect(() => {
        if (code && codeVerifier) {
            exchangeToken(
                { code, codeVerifier },
                {
                    onSuccess: () => {
                        navigate('/');
                    },
                    onError: () => {
                        navigate('/');
                        throw new Error('Token exchange fail');
                    },
                }
            );
        }
    }, [code, codeVerifier, exchangeToken, navigate]);

    return <Loading />;
};

export default AppCallback;
