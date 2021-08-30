import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import app from './app/config';

dotenv.config();

const port = process.env.PORT || process.env.DEFAULT_PORT;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
        mongoose.connection.close(false, () => {
            console.log('MongoDb connection closed.');
            process.exit(0);
        });
    });
});
