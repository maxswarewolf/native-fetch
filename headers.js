
const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
const MAP = 'map';
const INTERNAL = 'INTERNAL';
const HEADER_KIND_KEY = 'key';
const HEADER_KIND_VALUE = 'value';
const HEADER_KIND_BOTH = 'key+value';

const HeadersIteratorPrototype = Object.setPrototypeOf({
    next = () => {
        if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
            throw new TypeError('Value of `this` is not a HeadersIterator');
        }

        const {
            target,
            kind,
            index
        } = this[INTERNAL];
        const values = getHeaders(target, kind);
        const length = values.length;
        if (index >= length){
            return {
                value: undefined,
                done: true
            };
        }

        this[INTERNAL].index = index++;

        return {
            value: values[index],
            done: false
        };
    }    
}, Object.getPrototypeOf(
    Object.getPrototypeOf([][Symbol.iterator]())
));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

validateName = (name) => {
    name = `${name}`;
    if (invalidTokenRegex.test(name)) {
        throw new TypeError(`${name} is not a HTTP header name`);
    } 
    return name;
}

validateValue = (value) => {
    value = `${value}`;
    if (invalidHeaderCharRegex.test(value)) {
        throw new TypeError(`${value} is not a legal HTTP header value`);
    }
    return value;
}

find = (map, name) => {
    name = `${name}`.toLowerCase();
    for (const key in map) {
        if (key.toLowerCase() === name){
            return key;
        }
    }
    return undefined;
}

getHeaders = (headers, kind = HEADER_KIND_BOTH) => {
    const keys = Object.keys(headers[MAP]).sort();
    switch (kind) {
        case HEADER_KIND_KEY:
            return keys.map(k => k.toLowerCase());
        case HEADER_KIND_VALUE:
            return keys.map(k => headers[MAP][k].join(', '));
        case HEADER_KIND_BOTH:
            return keys.map(k => [k.toLowerCase(), headers[MAP][k].join(', ')]);
        default:
            return undefined;
    };
}

createHeadersIterator = (target, kind) => {
    const iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
        target,
        kind,
        index: 0
    };
    return iterator;
}

export const createHeadersLenient = (obj) => {
    const headers = new Headers();
    for (const name of Object.keys(obj)){
        if (invalidTokenRegex.test(name)){
            continue;
        }
        if (Array.isArray(obj[name])) {
            for (const value of obj[name]){
                if (invalidHeaderCharRegex.test(value)) {
                    continue;
                }
                if (headers[MAP][name] === undefined) {
                    headers[MAP][name] = [value];
                } else {
                    headers[MAP][name].push(value);
                }
            }
        } else if (!invalidHeaderCharRegex.test(name)) {
            headers[MAP][name] = [obj[name]];
        }
    }
    return headers;
}

export default class Headers {
    constructor(init = undefined) {
        this[MAP] = {};

        if (init instanceof Headers) {
            const rawHeaders = init.raw();
            const headerNames = Object.keys(rawHeaders);

            for (const name of headerNames) {
                for (const value of rawHeaders[name]) {
                    this.append(name, value);
                }
            }

            return;
        }

        if (init == null) {

        } else if (typeof init === 'object'){
            const method = init[Symbol.iterator];
            if (method != null) {
                if (typeof method !== 'function') {
                    throw new TypeError('Header pairs must be iterable');
                }

                for (const pair of init) {
                    if (typeof pair !== 'object' ||typeof pair[Symbol.iterator] !== 'function'){
                        throw new TypeError('Each header pair must be iterable');
                    }
                    if (pair.length !== 2){
                        throw new TypeError('each header pair must be a name/value tuple');
                    }
                    this.append(pair[0], pair[1]);
                }
            } else {
                for (const key of Object.keys(init)) {
                    const value = init[key];
                    this.append(key, value);
                }
            }
        } else {
            throw new TypeError('Provided initializer must be an object');
        }
    }

    get = (name) => {
        name = validateName(name);
        const key = find(this[MAP], name);
        return (key === undefined) ? null : this[MAP][key].join(', ');
    }

    forEach = (callback, thisArg = undefined) => {
        let pairs = getHeaders(this);
        for (i = 0; i < pairs.length; i++){
            const [name, value] = pairs[i];
            callback.call(thisArg, value, name, this);
            // pairs = getHeaders(this);
        }
    }

    set = (name, value) => {
        name = validateName(name);
        value = validateValue(value);
        const key = find(this[MAP], name);
        this[MAP][key !== undefined ? key : name] = [value];
    }

    append = (name, value) => {
        name = validateName(name);
        value = validateValue(value);
        const key = find(this[MAP], name);
        if (key !== undefined) {
            this[MAP][key].push(value);   
        } else {
            this[MAP][key] = [value];
        }
    }

    has = (name) => {
        return find(this[MAP], validateName(name)) !== undefined;
    }

    delete = (name) => {
        const key = find(this[MAP], validateName(name));
        if (key !== undefined){
            delete this[MAP][key];
        }
    }

    raw = () => {
        return this[MAP];
    }

    keys = () => {
        return createHeadersIterator(this, HEADER_KIND_KEY);
    }

    values = () => {
        return createHeadersIterator(this, HEADER_KIND_VALUE);
    }

    [Symbol.iterator] = () => {
        return createHeadersIterator(this, HEADER_KIND_BOTH);
    }
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
    value: 'Headers',
    writable: false,
    enumerable: false,
    configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});