import { ExternalUrls, Followers, Image } from './commonType';

export interface Artist {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    name?: string;
    type?: string;
    uri?: string;
}

export interface GetSeveralArtistsResponse {
    artists: {
        external_urls?: ExternalUrls;
        followers?: Followers;
        genres?: string[];
        href?: string;
        id?: string;
        images?: Image[];
        name?: string;
        popularity?: number;
        type?: 'artist';
        uri?: string;
    }[];
}
