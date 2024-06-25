import ws from "ws";
import { RATE_CHANGED_TOPIC, pubsub } from "../pubsub";

const wss = new ws.WebSocket("wss://stream.binance.com/ws/1", { port: 9443 });
wss.addEventListener("open", () => {
    console.log("WSS open");
    subscribe(wss);
})
wss.addEventListener("error", (err) => {
    console.log("WSS error", err);
})

let rate = 100000;
wss.addEventListener("message", (msg) => {
    console.log("[WSS]:", msg.data);
    const payload:AveragePricePayload = JSON.parse(msg.data.toString());
    rate = Number.parseFloat(payload.w);
    pubsub.publish(RATE_CHANGED_TOPIC,{
        rateChanged:rate
    })
})

interface AveragePricePayload {
    "e": "avgPrice",    // Event type
    "E": number,        // Event time
    "s": string,        // Symbol
    "i": string,        // Average price interval
    "w": string,        // Average price
    "T": number         // Last trade time
  }


function subscribe(ws: ws.WebSocket) {
    const body = {
        "method": "SUBSCRIBE",
        "params": [
            "bnbusdt@avgPrice",
        ],
        "id": 1
    }
    ws.send(JSON.stringify(body),(err)=>{
        if(err) console.log("[WSS] Failed to subscribe",err);
    })
}

export class BinanceAPI {
    getRate():number {
        return rate;
    }
}