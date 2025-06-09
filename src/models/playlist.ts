import { ApiResponse } from './apiResponse';
import { ExternalUrls, Image, Owner } from './commonType';

// playlist item
export interface PlaylistProps {
    id: string;
    name?: string;
    artist?: string;
    image?: string;
}

export interface GetCurrentUserPlaylistRequest {
    limit?: number;
    offset?: number;
}

// interface-> 넣을key값이 없기 때문에 type으로 사용
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface SimplifiedPlaylist {
    collaborative?: boolean;
    description?: string;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean;
    snapshot_id?: string;
    tracks?: {
        href?: string;
        total?: number;
    };
    type?: string;
    uri?: string;
}
