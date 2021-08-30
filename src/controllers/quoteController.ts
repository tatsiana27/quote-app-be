import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IQuote } from '../modules/quotes/model';
import QuoteService from '../modules/quotes/service';

export class QuoteController {
    private quoteService: QuoteService = new QuoteService();

    public getRandomQuote(req: Request, res: Response) {
        this.quoteService.findRandomQuote((err: any, quoteData: IQuote) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('Get quote successfully', quoteData, res);
            }
        });
    }

    public getQuoteList(req: Request, res: Response) {
        this.quoteService.getQuoteList((err: any, quoteData: IQuote) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('get quote successfully', quoteData, res);
            }
        });
    }

    public createQuote(req: Request, res: Response) {
        if (req.body.text && req.body.author && req.body.tags && req.body.isDeleted) {
            const quoteParams: IQuote = {
                text: req.body.text,
                author: req.body.author,
                tags: req.body.tags,
                isDeleted: req.body.isDeleted,
            };
            this.quoteService.createQuote(quoteParams, (err: any, quoteData: IQuote) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Create quote successfully', quoteData, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public getQuote(req: Request, res: Response) {
        if (req.params.id) {
            const quoteFilter = { _id: req.params.id };
            this.quoteService.findQuote(quoteFilter, (err: any, quoteData: IQuote) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Get quote successfully', quoteData, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public updateQuote(req: Request, res: Response) {
        if (req.params.id && (req.body.text || req.body.author || req.body.tags)) {
            const quoteFilter = { _id: req.params.id };
            this.quoteService.findQuote(quoteFilter, (err: any, quoteData: IQuote) => {
                if (err) {
                    mongoError(err, res);
                } else if (quoteData) {
                    const quoteParams: IQuote = {
                        _id: req.params.id,
                        text: req.body.text ? req.body.text : quoteData.text,
                        author: req.body.author ? req.body.author : quoteData.author,
                        tags: req.body.tags ? req.body.tags : quoteData.tags,
                        isDeleted: quoteData.isDeleted,
                    };
                    this.quoteService.updateQuote(quoteParams, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('Update quote successfully', null, res);
                        }
                    });
                } else {
                    failureResponse('Invalid quote', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public deleteQuote(req: Request, res: Response) {
        if (req.params.id) {
            this.quoteService.deleteQuote(req.params.id, (err: any, deleteDetails: any) => {
                if (err) {
                    mongoError(err, res);
                } else if (deleteDetails.deletedCount !== 0) {
                    successResponse('Delete quote successfully', null, res);
                } else {
                    failureResponse('Invalid quote', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}
