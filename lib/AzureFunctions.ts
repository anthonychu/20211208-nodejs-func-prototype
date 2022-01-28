
export function azureBlobInput(opts: AzureFunctionsAzureBlobInputBindingOptions) : AzureFunctionsAzureBlobInputBinding {
    return {
        ...opts,
        get() {
            // return blob data
            return 'data';
        }
    }
}

export function azureBlobOutput(opts: AzureFunctionsAzureBlobOutputBindingOptions) : AzureFunctionsAzureBlobOutputBinding {
    return {
        ...opts,
        set(value: any) {
        }
    }
}

export class App {
    constructor(public options: AzureFunctionsOptions = {}) {
    }

    http<T extends AzureFunctionsBindings>(opt: AzureFunctionsHttpOptions<T>): void {
    }

    timer<T extends AzureFunctionsBindings>(opt: AzureFunctionsTimerOptions<T>): void {
    }
}

interface AzureFunctions {
    options?: AzureFunctionsOptions;
    http(opt: AzureFunctionsHttpOptions<any>): void;
}

interface AzureFunctionsOptions {
    http?: any;
}

interface AzureFunctionsHttpOptions<T extends AzureFunctionsBindings> {
    method?: string;
    route?: string;
    bindings?: T;
    handler: (context: FunctionContext<T>, req: any, res: any, bindings: T) => Promise<void>;
}

interface AzureFunctionsTimerOptions<T extends AzureFunctionsBindings> {
    name: string;
    schedule: string;
    /**
     * Bindings
     * 
     * @example
     * // declare a blob output binding
     * bindings: {
     *   outputFile: azureBlobOutput({
     *     path: 'output/file.txt'
    *    })
     * }
     */
    bindings?: T;
    handler: (context: FunctionContext<T>, timerInfo, bindings: T) => Promise<void>;
}

interface AzureFunctionsBindings {
    [x: string]: AzureFunctionsBinding;
}

interface AzureFunctionsBinding {
}

interface AzureFunctionsAzureBlobInputBindingOptions extends AzureFunctionsBinding {
    path: string;
}

interface AzureFunctionsAzureBlobInputBinding extends AzureFunctionsAzureBlobInputBindingOptions {
    get(): any;
}

interface AzureFunctionsAzureBlobOutputBindingOptions extends AzureFunctionsBinding {
    path: string;
}

interface AzureFunctionsAzureBlobOutputBinding extends AzureFunctionsAzureBlobOutputBindingOptions {
    set(value: any): any;
}

interface FunctionContext<T extends AzureFunctionsBindings> {
    bindings: T,
    log: Logger
}

interface Logger {
    /**
     * Writes streaming function logs at the default trace level.
     */
    (...args: any[]): void;
    /**
     * Writes to error level logging or lower.
     */
    error(...args: any[]): void;
    /**
     * Writes to warning level logging or lower.
     */
    warn(...args: any[]): void;
    /**
     * Writes to info level logging or lower.
     */
    info(...args: any[]): void;
    /**
     * Writes to verbose level logging.
     */
    verbose(...args: any[]): void;
}