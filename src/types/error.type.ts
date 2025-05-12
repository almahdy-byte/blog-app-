export interface ErrorInterface {
    message: string;
    status: number;
    stack?: string;
    cause?: number;
}

export class CustomError extends Error implements ErrorInterface {
    status: number;
    cause?: number;

    constructor(message: string, status: number, cause?: number) {
        super(message);
        this.status = status;
        this.cause = cause;
        this.stack = (new Error()).stack;
    }
}
