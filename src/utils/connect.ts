import mongoose from "mongoose";
import config from "config";
import logger from './logger'

async function connect () {
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        logger.info('Database is connected');
    } catch (error) {
        logger.error('You suck at life');
        process.exit(1);
    }

}

export default connect;