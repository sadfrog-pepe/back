/**
 * note : regular expression functions
 */
const getUntilPathname = (originalUrl: string) => {
    return originalUrl.split("#")?.at(0)?.split("?").at(0) || "";
};

export const includeForehead = (expression: string) => {
    return new RegExp(`(=([0-9a-zA-Z.%\\[\\]…])+?)(?=(${expression}))`, "g");
};

export const checkSpacedUrl = (originalUrl: string) => {
    return originalUrl.replaceAll(new RegExp("(\\s|​)+", "ig"), "");
};

export const checkRepeatedUrl = (originalUrl: string) => {
    const hostRegExp = new RegExp("https?://", "g");
    const matchedHost = originalUrl.match(hostRegExp);
    let link = originalUrl;

    if (matchedHost?.length === 2) {
        const splitedOriginalUrl = originalUrl.split("");
        const splicedUrl = splitedOriginalUrl.splice(0, originalUrl.length / 2);

        if (splitedOriginalUrl.join("") === splicedUrl.join("")) {
            link = splitedOriginalUrl.join("");
        }
    }

    return link;
};

export const checkHttpUrl = (originalUrl: string) => {
    const hostRegExp = new RegExp("https?://", "g");
    const matchedHost = originalUrl.match(hostRegExp);
    let link = originalUrl;

    if (matchedHost?.length === 1 && matchedHost.at(0) === "http://") {
        // NOTE : 호스트가 1개지만, http로 되어 있는 경우에는 https로 수정해준다.
        link = originalUrl.replaceAll("http://", "https://");
    } else if (!matchedHost?.length) {
        // NOTE : 호스트가 붙어 있지 않은 경우에 대한 처리
        link = `https://${originalUrl}`;
    }

    return link;
};

/**
 * note : regular expression function but it limited to Naver.
 */
export const getNaverPathname = (originalUrl: string) => {
    return getUntilPathname(originalUrl).replaceAll("https://m.", "https://");
};

export const checkIsNaverProductDetailPage = (originalUrl: string): string => {
    if (!originalUrl || originalUrl?.length === 0) {
        return;
    }

    const trimedUrl = checkSpacedUrl(originalUrl);
    const checkedRepeatedUrl = checkRepeatedUrl(trimedUrl);
    const checkedHttpUrl = checkHttpUrl(checkedRepeatedUrl);

    let replacedUrl = originalUrl;

    const naverExpression = "^(https://)(.+)?\\.?naver\\.((com)|(me))";
    const naverRegExp = new RegExp(naverExpression, "g");
    const naverIsNotQueryString = includeForehead(naverExpression);
    const naverProductDetailRegExp = new RegExp(
        "((shopping)|(brand)|(smartstore))\\.naver\\.com",
        "g"
    );

    if (
        !naverIsNotQueryString.test(checkedHttpUrl) &&
        naverRegExp.test(checkedHttpUrl)
    ) {
        if (naverProductDetailRegExp.test(checkedHttpUrl)) {
            replacedUrl = getNaverPathname(replacedUrl);
            return replacedUrl;
        }
    }
};
