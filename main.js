import { argv } from 'node:process';
import { crawlPage } from './crawl.js';

async function main() {

        if (argv.length !== 3) {
                console.log('Not enough or too many arguments, accepting min 1 and max 1 argument');
                return;
        }

        console.log(`Base URL is: ${argv[2]}`);
        const pages = await crawlPage(argv[2]);
        console.log(pages);

}

main()

