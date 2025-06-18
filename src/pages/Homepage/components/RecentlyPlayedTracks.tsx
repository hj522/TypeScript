import { Grid, Typography } from '@mui/material';
import useGetRecentlyPlayedTracks from '../../../hooks/useGetRecentlyPlayedTracks';
import useGetCurrentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import { useMemo } from 'react';
import Card from '../../../common/components/Card';

const RecentlyPlayedTracks = () => {
    const before = useMemo(() => Date.now() - 1000 * 60 * 60 * 24, []); //최근24시간계산

    //쓸데없는 객체 재생성 방지
    //24시간 전 최근 6개 트랙만
    const params = useMemo(
        () => ({
            limit: 6,
            before,
        }),
        [before]
    );

    const { data: user } = useGetCurrentUserProfile();
    const { data } = useGetRecentlyPlayedTracks(params);

    // console.log('최근 트랙 data', data);
    if (!user) return <div>없숨</div>;

    return (
        <div>
            {!data || data.items.length < 0 ? (
                <div>123123123213</div>
            ) : (
                <>
                    <Typography variant="h1" paddingTop="8px" marginBottom="15px">
                        Recently Played Tracks
                    </Typography>
                    {data && data.items.length > 0 ? (
                        <Grid container spacing={2}>
                            {data.items.map((item) => (
                                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.track.id}>
                                    <Card
                                        image={item.track.album.images[0].url}
                                        name={item.track.name}
                                        artistName={item.track.artists.map((artist) => artist.name).join(', ')}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="h2">No Data</Typography>
                    )}
                </>
            )}
        </div>
    );
};

export default RecentlyPlayedTracks;
