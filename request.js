import { METHOD_GET, METHOD_HEAD, DEFAULT_METHOD } from './constants';
const PARTS = 'PARTS';


const isRequest = (input) => {
    return (
        typeof input === 'object' && 
        typeof input[PARTS] === 'object'
    );
}

export default class Request {
    constructor(input, init = {}) {

        if (isRequest(input)) {
            // this[PARTS].parsedURL = parseURL(input.url);
            this[PARTS].parsedURL = input.url; 
        } else {
            if (input && input.href) {
                // this[PARTS].parsedURL = parseURL(input.href);
                this[PARTS].parsedURL = input.href;
            } else {
                // this[PARTS].parsedURL = parseURL('${input}');
                this[PARTS].parsedURL = `${input}`;
            }
            input = {};
        }

        this[PARTS].method = (init.method || input.method || DEFAULT_METHOD).toUpperCase();

        if ((init.body !== null || (isRequest(input) && input.body !== null)) && 
        ( method === METHOD_GET || method === METHOD_HEAD)) {
            throw new TypeError(`Request with ${METHOD_GET}/${METHOD_HEAD} method connot have a body`);
        }

        let inputBody = init.body !== null ? 
            init.body :
            isRequest(input) && input.body !== null ?
                clode(input) :
                null;

        // Body.call(this, inputBody, {
		//	  timeout: init.timeout || input.timeout || 0,
		//	  size: init.size || input.size || 0
        // });
        
        this[PARTS].headers = new Headers(init.headers || input.headers || {});
        
        
    }

    method = () => {
        return this[PARTS].method;
    }

    url = () => {
        return this[PARTS].parsedURL;
    }

    headers = () => {
        return this[PARTS].headers;
    }

    redirect = () => {
        return this[PARTS].redirect;
    }

    clone = () => {
        return new Request(this);
    }
}