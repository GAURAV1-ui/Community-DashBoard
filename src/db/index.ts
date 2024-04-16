import * as mongoDb from 'mongoDb';

export const collections: {community?: mongoDb.Collection} = {}

export async function connectToDatabase() {
    const mongodbUri = process.env.MONGODB_URI || '';
    
    const client: mongoDb.MongoClient = new mongoDb.MongoClient(mongodbUri);
    await client.connect();

    const db: mongoDb.Db = client.db(process.env.DB_NAME);

    const collectionName = process.env.COLLECTION_NAME || '';


    const communityCollection: mongoDb.Collection = db.collection(collectionName);

    collections.community = communityCollection;

    console.log(`Successfull ${db.databaseName} and collection: ${communityCollection.collectionName}`);
}


