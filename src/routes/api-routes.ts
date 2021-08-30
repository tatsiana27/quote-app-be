import { Application, Request, Response } from 'express';
import { QuoteController } from '../controllers/quoteController';

export class ApiRoutes {
    private quoteСontroller: QuoteController = new QuoteController();

    public route(app: Application) {
        app.get('/api/ping', (req: Request, res: Response) => {
            res.status(200).send({message: 'OK', time: new Date().toISOString()});
        });

        app.get('/api/quotes/random', (req: Request, res: Response) => {
            this.quoteСontroller.getRandomQuote(req, res);
        });

        app.get('/api/quotes', (req: Request, res: Response) => {
            this.quoteСontroller.getQuoteList(req, res);
        });

        app.post('/api/quotes', (req: Request, res: Response) => {
            this.quoteСontroller.createQuote(req, res);
        });

        app.get('/api/quotes/:id', (req: Request, res: Response) => {
            this.quoteСontroller.getQuote(req, res);
        });

        app.put('/api/quotes/:id', (req: Request, res: Response) => {
            this.quoteСontroller.updateQuote(req, res);
        });

        app.delete('/api/quotes/:id', (req: Request, res: Response) => {
            this.quoteСontroller.deleteQuote(req, res);
        });
    }
}
