import { ApiResponse } from './apiResponse';
import { Artist } from './artist';
import { ExternalUrls, Image, Restriction } from './commonType';

// 앨범 정보
export interface GetNewReleasesResponse {
    albums: ApiResponse<SimplifiedAlbum>;
}

// items 따로 빼둠
export interface SimplifiedAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_pricision: string;
    restrictions: Restriction;
    type: string;
    uri: string;
    artists: Artist[];
}
