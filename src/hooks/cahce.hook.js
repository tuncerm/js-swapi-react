import {useCallback, useRef} from 'react';

import {useFetch} from './http.hook';

export const useCache = () => {
    const cache = useRef({});

    const {sendRequest} = useFetch();

    const getData = useCallback(async (url)=>{
        const urlKey = btoa(url);
        if (cache.current[urlKey]){
            return cache.current[urlKey];
        }
        const data = await sendRequest(url);
        cache.current[urlKey] = data;
        return data;
    }, [cache, sendRequest]);

    return {getData};
}