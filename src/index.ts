import colors from "colors";

import { OptionMethodGet, SendDataServer } from "./config/options";
import ConfigYarg from "./config/config";
// import { SendBodyFile } from "./utils/index";

console.log(colors.yellow(`
- GitHub: https://www.github.com/a1vinho    
`));

(async () => {
    const {
        body,
        method,
        url,
        output,
        header
    } = await ConfigYarg();
    if (!url) {
        throw new Error('ERRO:Url is not present');
    };
    try {
        const Url = new URL(url);
        switch (method) {
            case 'GET': {
                OptionMethodGet({
                    method,
                    outputFile: typeof output !== 'boolean' ? output : false,
                    header: header ? header : '',
                    url: Url
                });
                break
            };
            case 'POST':
            case 'DELETE':
            case 'PUT': {
                SendDataServer({
                    data: body ? body : '',
                    method,
                    outputFile: typeof output !== 'boolean' ? output : '',
                    url: Url,
                    header: header as string
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