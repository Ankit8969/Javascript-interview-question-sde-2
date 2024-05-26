
// fetch with auto-retry



function fetchWithAutoRetry(fetch, maxCount) {
    return new Promise(async (resolve, reject) => {
        for (let i=0;i<maxCount ; i++) {
            await fetch[i].then((res) => {
                resolve("output");
            }).catch((err) => {
                console.log("Doing Refetch- ", err);
            })
        }
        reject("Max fetch Reached");
    })
}

let p1 = Promise.reject('p1')
let p2 = Promise.reject('p2')
let p3 = Promise.reject('p3')
let p4 = Promise.reject('p4')
let p5 = Promise.resolve('p5-done')
let p6 = Promise.resolve('fetching')

let arrPromise = [p1,p2, p3, p4, p5, p6];

fetchWithAutoRetry(arrPromise, 6).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})
