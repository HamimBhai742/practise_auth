import { Server } from "http";
import { env } from "./config/env";
import { app } from "./app";
import { dbConnected } from "./app/db/db.connected";
import { seedAdmin } from "./app/utils/seedAdmin";

let server: Server;

const PORT = env.port;

const main = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    await dbConnected();
    await seedAdmin();
  } catch (error) {
    console.log(error);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM is received");
    if (server) {
      server.close();
    }
  });

  process.on("SIGINT", () => {
    console.log("SIGINT is received");
    if (server) {
      server.close();
    }
  });

  process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
  });

  process.on("uncaughtExceptionMonitor", (error) => {
    console.log(error);
    process.exit(1);
  });

  process.on("uncaughtRejection", (error) => {
    console.log(error);
    process.exit(1);
  });
};

main();
