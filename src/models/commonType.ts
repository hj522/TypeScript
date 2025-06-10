export interface ExternalUrls {
    spotify?: string;
}

export interface Image {
    url: string;
    height?: number;
    width?: number;
}

export interface Restriction {
    reason?: string;
}

export interface Followers {
    href?: string | null;
    total?: number;
}

export interface ExplicitContent {
    filter_enabled?: boolean;
    filter_locked?: boolean;
}

export interface Owner {
    display_name?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
}

export interface Restrictions {
    reason?: string;
}
