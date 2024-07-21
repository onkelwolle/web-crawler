import { JSDOM } from 'jsdom';
export { normalizeURL, getURLsFromHTML, crawlPage };

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

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {

        const currentURLObj = new URL(currentURL);
        const baseURLObj = new URL(baseURL);

        if (baseURLObj.hostname !== currentURLObj.hostname) {
                return pages;
        }

        const normalizedCurrentURL = normalizeURL(currentURL);

        if (pages[normalizedCurrentURL] > 0) {
                pages[normalizedCurrentURL]++;
                return pages;
        }

        pages[normalizedCurrentURL] = 1;
        const crawledHtml = await fetchHtml(currentURL);

        const urlList = getURLsFromHTML(crawledHtml, baseURL);

        for (const url of urlList) {
                pages = await crawlPage(baseURL, url, pages);
        }
        return pages;
}

async function fetchHtml(url) {
        console.log(`crawling: ${url}`);

        let response;
        try {
                response = await fetch(url);
        } catch (err) {
                console.log(`Got Network Error: ${err.message}`);
                return;
        }

        if (response.status > 399) {
                console.log(`Got http error: ${response.status} ${response.statusText}`);
                return;
        }

        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('text/html')) {
                console.log(`Got none html response: ${contentType}`);
                return;
        }

        return response.text();
}
