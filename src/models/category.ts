export interface getCategoryRequest {
    locale?: string;
    limit?: number;
    offset?: number;
}

export interface getCategoryResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: Category[];
}

export interface Category {
    href: string;
    icons: {
        url: string;
        height: number | null;
        width: number | null;
    }[];
    id: string;
    name: string;
}
