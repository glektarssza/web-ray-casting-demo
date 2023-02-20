import {dom} from './utils';

async function main(): Promise<void> {
    await dom.ready();
    // TODO
}

main()
    .then(() => {
        console.info('Game started normally');
    })
    .catch((error: Error): void => {
        console.error('Fatal error during startup');
        console.error(error);
    });
