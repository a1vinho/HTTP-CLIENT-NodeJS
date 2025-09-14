import colors from "colors";

import { OptionMethodGet, SendDataServer} from "./config/options";
import ConfigYarg from "./config/config";
import {SendBodyFile} from "./utils/index";


console.log(colors.yellow(`
- GitHub: https://www.github.com/a1vinho    
`));

(async () => {
    const {
        body,
        method,
        url,
        output,
        bodyFile
    } = await ConfigYarg();

    if (!url) {
        throw new Error('ERRO:Url is not present');
    };
    try {
        const Url = new URL(url);
        switch (method) {
            case 'GET': {
                OptionMethodGet(Url, 'GET', output as string);
                break
            };
            case 'POST':
            case 'DELETE':
            case 'PUT': {
                SendDataServer({
                    data: body ? body : '',
                    method,
                    outputFile: typeof output !== 'boolean' ? output : '',
                    url:Url,
                    bodyFile: typeof bodyFile !== 'boolean' ? bodyFile : ''
                }); 
                break
            };
        }
    }
    catch (e) {
        const err = e as {
            code: string;
            input: string;
        };
        if (err.code === 'ERR_INVALID_URL') {
            console.log(colors.red(`
 ERRO:INVALID URL
 Try using protocol before domain: ${colors.green(`https://${err.input}`)}
            `));
        }
    };
})();