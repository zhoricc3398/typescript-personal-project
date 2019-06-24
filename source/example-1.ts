const f = async function ():Promise<number> {
    return 1;
};

(async () => {
    const n: number = await f();
    console.log(n);
})();