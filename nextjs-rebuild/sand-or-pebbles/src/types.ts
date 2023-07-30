import { Connection } from "mongoose";

export interface IDBConnection {
    connection: Connection;
    closeConnection: () => Promise<void>;
  }