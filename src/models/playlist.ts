import { ApiResponse } from './apiResponse';
import { ExternalUrls, Followers, Image, Owner } from './commonType';
import { Episode, Track } from './track';

// playlist item
export interface PlaylistProps {
    id: string;
    name?: string;
    artist?: string;
    image?: string;
    handleClick: (id: string) => void;
    selectedId: string;
}

export interface GetCurrentUserPlaylistRequest {
    limit?: number;
    offset?: number;
}

// interface-> 넣을key값이 없기 때문에 type으로 사용
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasicPlaylist {
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
    type?: 'playlist';
    uri?: string;
}

export interface SimplifiedPlaylist extends BasicPlaylist {
    tracks?: {
        href?: string;
        total?: number;
    };
}

export interface Playlist extends BasicPlaylist {
    tracks: ApiResponse<PlaylistTrack>;
    followers: Followers;
}

export interface PlaylistTrack {
    added_at?: string | null;
    added_by?: {
        external_urls?: ExternalUrls;
        followers?: Followers;
        href?: string;
        id?: string;
        type?: string;
        uri?: string;
    } | null;
    is_local?: boolean;
    track: Track | Episode;
}

export interface getPlaylistRequest {
    playlist_id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}

export interface getPlaylistItemsRequest extends getPlaylistRequest {
    offset?: number;
    limit?: number;
}

export type getPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface PlaylistTrack {
    added_at?: string | null; //Note: some very old playlists may return null in this field.
    added_by?: {
        external_urls?: ExternalUrls;
        followers?: Followers;
        href?: string;
        id?: string;
        type?: string;
        uri?: string;
    } | null;
    is_local?: boolean;
    track: Track | Episode;
}
