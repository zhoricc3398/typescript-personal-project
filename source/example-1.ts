import { f } from './example-2';

(async () => {
    const n = await f();
    console.log(n);
})();