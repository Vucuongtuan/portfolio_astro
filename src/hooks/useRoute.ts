import { getLangFromUrl } from "@i18n/utils";
import { useEffect, useMemo, useState } from "react";




export default function useRoute() {
    const [pathname,setPathname] = useState<string>('');
    const [route,setRoute] = useState<string>('');
    const  locale = useMemo(()=> {
        if(!pathname) return 'en';
        return getLangFromUrl(pathname as any)
    }, [pathname]);
    useEffect(() => {
        if(!window) return;
        setPathname(window.location.pathname);
        setRoute(window.location.pathname.charAt(1) === 'e' && window.location.pathname.charAt(2) === 'n' ? 'en' : 'vi');

    },[pathname,route]);

    return {pathname,route,locale};
    
}