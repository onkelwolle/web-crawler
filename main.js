import { argv } from 'node:process';

function main() {

        if (argv.length !== 3) {
                console.log('Not enough or too many arguments, accepting min 1 and max 1 argument');
                return;
        }

        console.log(`Base URL is: ${argv[2]}`);
}

main()

