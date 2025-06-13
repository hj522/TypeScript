import loadingSpinner from './loadingSpinner.gif';

const SearchLoading = () => {
    return (
        <div style={{ height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={loadingSpinner} alt="loading" width="8%" />
        </div>
    );
};

export default SearchLoading;
