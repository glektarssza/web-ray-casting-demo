async function domReady(timeout = Infinity): Promise<void> {
    if (document.readyState === 'complete') {
        return;
    }
    await new Promise<void>((resolve, reject): void => {
        if (document.readyState === 'complete') {
            resolve();
            return;
        }
        let timer: number | null = null;
        const onReadyStateChange = (): void => {
            if (document.readyState === 'complete') {
                if (timer !== null) {
                    clearTimeout(timer);
                }
                resolve();
            }
        };
        if (isFinite(timeout) && timeout >= 0) {
            timer = setTimeout((): void => {
                document.removeEventListener(
                    'readystatechange',
                    onReadyStateChange
                );
                reject(
                    new Error(`DOM did not become ready within ${timeout}ms`)
                );
            }, timeout);
        }
        document.addEventListener('readystatechange', onReadyStateChange, {
            once: true
        });
    });
}

async function main(): Promise<void> {
    await domReady();
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
