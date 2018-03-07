export const METHOD_GET = 'GET';
export const METHOD_HEAD = 'HEAD';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_DELETE = 'DELETE';
export const METHOD_OPTIONS = 'OPTIONS';
export const DEFAULT_METHOD = METHOD_GET;
export const METHODS = {METHOD_GET, METHOD_HEAD, METHOD_DELETE, METHOD_OPTIONS, METHOD_POST, METHOD_PUT};


export const CREDENTIAL_OMIT = 'OMIT'
export const DEFAULT_CREDENTIALS = CREDENTIAL_OMIT;
export const CREDENTIALS = {CREDENTIAL_OMIT};

export const DEFAULT_MODE = null;
export const DEFAULT = [
    DEFAULT_METHOD,
    DEFAULT_CREDENTIALS,
    DEFAULT_MODE
]

export default {
    ...DEFAULT
};