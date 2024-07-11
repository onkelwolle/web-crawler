import { JSDOM } from 'jsdom';
export { normalizeURL, getURLsFromHTML };

function normalizeURL(url) {
        const urlObj = new URL(url);
        let fullPath = `${urlObj.host}${urlObj.pathname}`;

        if (fullPath.slice(-1) === '/') {
                fullPath = fullPath.slice(0, -1);
        }
        return fullPath;
}

function getURLsFromHTML(htmlBody, baseURL) {
        const dom = new JSDOM(htmlBody);
        const anchorElements = dom.window.document.querySelectorAll('a');

        const urls = Array.from(anchorElements).map(anchor => {
                const href = anchor.href;
                return new URL(href, baseURL).href;
        });

        return urls;
}
