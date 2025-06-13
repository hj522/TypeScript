import loadingSpinner from './loadingSpinner.gif';

const Loading = () => {
    return (
        <div style={{ height: '30dvh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={loadingSpinner} alt="loading" width="8%" />
        </div>
    );
};

export default Loading;
