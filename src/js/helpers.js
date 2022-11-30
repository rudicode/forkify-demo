import { async } from "regenerator-runtime" // TODO: verify if I need this
import { TIMEOUT_SECONDS } from "./config.js";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        }) : fetch(url);

        console.log(`AJAX: ${url}`);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
        data = await res.json();
        // console.log(res, data);
        if (!res.ok) throw new Error(`${data.message} (${res.status})`)
        return data;
    } catch (err) {
        throw err; // rethorw error
    }
};

// export const getJSON = async function (url) {
//     try {
//         console.log(`Fetching: ${url}`);
//         const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
//         data = await res.json();
//         // console.log(res, data);
//         if (!res.ok) throw new Error(`${data.message} (${res.status})`)
//         return data;
//     } catch (err) {
//         throw err; // rethorw error
//     }
// }

// export const sendJSON = async function (url, uploadData) {
//     try {
//         const fetchPro = fetch(url, {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(uploadData)
//         });
//         const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
//         data = await res.json();
//         // console.log(res, data);
//         if (!res.ok) throw new Error(`${data.message} (${res.status})`)
//         return data;
//     } catch (err) {
//         throw err; // rethorw error
//     }
// }