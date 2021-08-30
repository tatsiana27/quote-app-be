import { Response } from 'express';
import { RESPONSE_STATUS_CODES } from './model';

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(RESPONSE_STATUS_CODES.success).json({
        data: DATA,
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(RESPONSE_STATUS_CODES.success).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA,
    });
}

export function insufficientParameters(res: Response) {
    res.status(RESPONSE_STATUS_CODES.badRequest).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {},
    });
}

export function mongoError(err: any, res: Response) {
    res.status(RESPONSE_STATUS_CODES.internalServerError).json({
        STATUS: 'FAILURE',
        MESSAGE: 'MongoDB error',
        DATA: err,
    });
}
