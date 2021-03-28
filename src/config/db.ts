import { Connection, createConnection, getConnectionManager } from "typeorm";
import connectionOptions from "../../ormconfig";

const CONNECTION_NAME = "default";

const connectionManager = getConnectionManager();

export async function getConnection() {
  let connection: Connection;

  if (connectionManager.has(CONNECTION_NAME)) {
    connection = await connectionManager.get(CONNECTION_NAME);

    if (!connection.isConnected) {
      connection.connect();
    }
  } else {
    connection = await createConnection(connectionOptions);
  }

  return connection;
}
