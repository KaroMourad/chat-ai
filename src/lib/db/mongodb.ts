import { MongoClient, Db, Collection } from "mongodb";

const URI = process.env.MONGODB_URI as string;
if (!URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
const COLLECTION_NAME = "chats";

const client = new MongoClient(URI);

let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) return db;
  try {
    await client.connect();
    db = client.db();
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export async function getChatsCollection(): Promise<Collection> {
  const database = await connectToDatabase();
  return database.collection(COLLECTION_NAME);
}
