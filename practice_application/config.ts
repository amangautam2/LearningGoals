import { config } from "dotenv";
import { join } from "path";

const environment = process.env.NODE_ENV ? 
    process.env.NODE_ENV
    : "development";

const path = join(process.cwd(), `.env.${environment}`);

config({
    path
});

let Config: any = {};

(
    () => {
        for(let keys in process.env) {
            Config[keys] = process.env[keys];
        }
    }
)();

export default Config;