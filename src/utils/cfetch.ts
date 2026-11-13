import equal from "fast-deep-equal";
import { STORAGE_ITEMS } from "../config";

// cfecth – cashed fetch
async function cfetch(query: RequestInfo): Promise<Object> {
    let apiCache = localStorage.getItem(STORAGE_ITEMS.APICache);

    if (apiCache == null) {
        let apiReturn = await (await fetch(query)).json();
        cachingAPI(query.toString(), apiReturn);
        return apiReturn;
    } else if (Object.hasOwn(JSON.parse(apiCache), query.toString())) {
        verifyAPICache(query.toString());
        return JSON.parse(apiCache)[query.toString()];
    } else {
        let apiReturn = await (await fetch(query)).json();
        cachingAPI(query.toString(), apiReturn);
        return apiReturn;
    }
}

async function verifyAPICache(query: string) {
    let apiCache = localStorage.getItem(STORAGE_ITEMS.APICache);

    if (apiCache == null) {
        return;
    } else if (Object.hasOwn(JSON.parse(apiCache), query.toString())) {
        let apiReturn = await (await fetch(query)).json();
        if (!equal(apiReturn, JSON.parse(apiCache)[query.toString()])) {
            await cachingAPI(query, apiReturn);
            location.reload();
        }
    }
}

async function cachingAPI(query: string, output: object) {
    let apiCacheGet = localStorage.getItem(STORAGE_ITEMS.APICache);
    let apiCache: Record<string, object> = apiCacheGet
        ? JSON.parse(apiCacheGet)
        : {};
    apiCache[query] = output;

    localStorage.setItem(STORAGE_ITEMS.APICache, JSON.stringify(apiCache));
}

export default cfetch;
