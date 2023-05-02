import ApiError from "@src/util/errors/api-error";
import { Request, Response, NextFunction } from "express";

export interface HTTPError extends Error {
    status?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apiErrorValidator(error: HTTPError, __: Partial<Request>, res: Response, _: NextFunction): void {
    const errorCode = error.status || 500;

    res
        .status(errorCode)
        .send(ApiError.format({ code: errorCode, message: error.message }))
}