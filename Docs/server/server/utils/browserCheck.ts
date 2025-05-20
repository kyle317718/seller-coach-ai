export const getBrowserInfo = () => {
    if (typeof window === 'undefined') return null;

    const ua = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";

    // Chrome
    if (ua.indexOf("Chrome") > -1) {
        browserName = "Chrome";
        browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || "";
    }
    // Firefox
    else if (ua.indexOf("Firefox") > -1) {
        browserName = "Firefox";
        browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || "";
    }
    // Safari
    else if (ua.indexOf("Safari") > -1) {
        browserName = "Safari";
        browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || "";
    }

    return { browserName, browserVersion };
};

export const isSafari = () => {
    if (typeof window === 'undefined') return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const isWebPSupported = async () => {
    if (typeof window === 'undefined') return false;

    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';

    return new Promise((resolve) => {
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 1);
        };
    });
}; 