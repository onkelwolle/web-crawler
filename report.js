export { printReport, sortPages };

function printReport(pages) {
        console.log('Start printing report');

        const sortedPages = sortPages(pages);

        for (const page of sortedPages) {
                console.log(`Found ${page[1]} internal links to ${page[0]}`);
        }
}

function sortPages(pages) {

        const pagesArr = Object.entries(pages);
        pagesArr.sort((pageA, pageB) => {
                if (pageB[1] === pageA[1]) {
                        return pageA[0].localeCompare(pageB[0]);
                }
                return pageB[1] - pageA[1];
        });

        return pagesArr;
}

