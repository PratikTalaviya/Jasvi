// import axios from "axios";
// const api = axios.create({
//     baseURL: "https://apiv2.shiprocket.in/v1/external",
//     headers: {
//         'Content-Type': 'application/json',

//         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMxMDcyNjAsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjcxODc2Mjg2LCJleHAiOjE2NzI3NDAyODYsIm5iZiI6MTY3MTg3NjI4NiwianRpIjoiQkc5cjFxWjd3ZGJNR0dVSiJ9.n6BVeAQFvKvDCivjYJugW9egtcUa3bdy8CaCzXjY27o',
//     },
//     withCredentials: true
// })

// export const allorder = () => {
//     return api.get('/orders')
// }
const axios = require("axios").default;

// const api = axios.create({
//     baseURL: "https://apiv2.shiprocket.in/v1/external",
//     headers: {
//         'Content-Type': 'application/json',

//         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMxMDcyNjAsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjc2NDQxNjk2LCJleHAiOjE2NzczMDU2OTYsIm5iZiI6MTY3NjQ0MTY5NiwianRpIjoiMWU0cGZZcWRQU1Z2dEFZUSJ9.ITH0-SwdSm-ez8AWsBfsgGCQ3HkT6UlzoxGpM5w-kTY',
//     },
//     withCredentials: true
// })


const api = axios.create({
    baseURL: "https://apiv2.shiprocket.in/v1/external",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SHIP_TOKEN}`,
    },
    withCredentials: true
})
module.exports.authentication = (data) => {
    process.env.SHIP_TOKEN = data
    api.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SHIP_TOKEN}`,
    };
}




export const allorder = async () => {
    return new Promise(async (resolve, reject) => {
        await api.get('/orders').then((result) => resolve(result)).catch((error) => reject(error))
    })
}
export const Specificorder = (data) => {
    console.log("🚀 ~ file: axios.js:53 ~ Specificorder ~ data", data)
    return api.get(`/orders/show/${data}`)
}
export const trackingord = (awb) => {
    return api.get(`/courier/track/awb/${awb}`)
}
export const trackingordshipmentid = (shipment_id) => {
    return api.get(`/courier/track/shipment/${shipment_id}`)
}
export const trackingordorderid = (data) => {
    const keys = Object.keys(data)
    return api.get(`/courier/track?${keys[0]}=${data[keys[0]]}`)  //order id and channel_id
}

export const courierListWithCounts = () => {
    return api.get(`/courier/courierListWithCounts`)
}

export const allreturnorder = () => {
    return api.get(`orders/processing/return`)
}

export const createorder = (data) => {
    return api.post('/orders/create/adhoc', data)
}
export const ReturnOrder = (data) => {
    console.log("🚀 ~ file: axios.js:77 ~ ReturnOrder ~ data:", data)
    return api.post('/orders/create/return', data)
}

export const cancelorder = (data) => {
    return api.post("/orders/cancel", data)
}



