import { IQuote } from './model';
import quotes from './schema';

export default class QuoteService {
    public createQuote(quoteParams: IQuote, callback: any) {
        const session = new quotes(quoteParams);
        session.save(callback);
    }

    public findQuote(query: any, callback: any) {
        quotes.findOne(query, callback);
    }

    public updateQuote(quoteParams: IQuote, callback: any) {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        const query = { _id: quoteParams._id };
        quotes.findOneAndUpdate(query, quoteParams, callback);
    }

    public deleteQuote(_id: String, callback: any) {
        const query = { _id: _id };
        quotes.deleteOne(query, callback);
    }

    public findRandomQuote(callback: any) {
        quotes.count().exec((err: any, count: number) => {
            const random = Math.floor(Math.random() * count);

            quotes.findOne().skip(random).exec(callback);
        });
    }

    public getQuoteList(callback: any) {
        quotes.find({}).limit(20).exec(callback);
    }
}
