/* eslint-disable */
const isDebug = window.location.hostname === "localhost"

export const apiHost = isDebug ? "http://localhost:5000/api/" : "https://hohuuduc.onrender.com/"

export const errorLog = isDebug ? 
    (err: object) => console.error(err) 
    : 
    (err: object) => {
        //api write log
        undefined
    }