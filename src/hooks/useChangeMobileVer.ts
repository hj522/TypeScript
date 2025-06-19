import { useMediaQuery } from '@mui/material';

const useChangeMobileVer = () => {
    return useMediaQuery('(max-width: 768px)');
};

export default useChangeMobileVer;
