import * as tough from 'tough-cookie';
export declare type FetchImpl1 = typeof fetch;
export declare type FetchImpl = (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
export interface GenericRequest {
    url: string;
}
export interface URLLike {
    href: string;
}
export declare type GenericRequestInfo = string | URLLike | GenericRequest;
export interface GenericRequestInit {
    method?: string;
    redirect?: string;
    body?: any;
    referrerPolicy?: string;
}
export interface GenericResponse {
    url: string;
    status: number;
    headers: {
        get: (name: string) => string | null;
        has: (name: string) => boolean;
    };
}
export declare type FetchCookieInit<T extends GenericRequestInit> = T & {
    maxRedirect?: number;
    redirectCount?: number;
};
export declare type GenericFetch<T1 extends GenericRequestInfo, T2 extends GenericRequestInit, T3> = (input: T1, init?: T2) => Promise<T3>;
export interface FetchCookieImpl<T1 extends GenericRequestInfo, T2 extends GenericRequestInit, T3> {
    (input: T1, init?: FetchCookieInit<T2>): Promise<T3>;
    toughCookie: typeof tough;
}
export declare type NodeFetchHeaders = Headers & {
    getAll?: (name: string) => string[];
    raw?: () => {
        [name: string]: string[];
    };
};
export interface CookieJar {
    getCookieString: (currentUrl: string) => Promise<string>;
    setCookie: (cookieString: string, currentUrl: string, opts: {
        ignoreError: boolean;
    }) => Promise<any>;
}
declare function fetchCookie<T1 extends GenericRequestInfo, T2 extends GenericRequestInit, T3 extends GenericResponse>(fetch: GenericFetch<T1, T2, T3>, jar?: CookieJar, ignoreError?: boolean): FetchCookieImpl<T1, T2, T3>;
declare namespace fetchCookie {
    var toughCookie: typeof tough;
}
export default fetchCookie;
