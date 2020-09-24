import './util/module-alias';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import bodyParser from 'body-parser';
import { TrackerController } from '@src/controllers/tracker-controller';
import * as http from 'http';
import logger from '@src/logger';

export class SetupServer extends Server {
  private server?: http.Server;
  /*
   * same as this.port = port, declaring as private here will
   * add the port variable to the SetupServer instance
   */
  constructor(private port = 3000) {
    super();
    logger.info('Server is running on port 3000.');
  }

  /*
   * We use a different method to init instead of using the constructor
   * this way we allow the server to be used in tests and normal initialization
   */
  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
    //must be the last
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    // parse requests of content-type - application/json
    this.app.use(bodyParser.json());
    this.setupControllers();
  }

  private setupControllers(): void {
    const trackerController = new TrackerController();
    this.addControllers([trackerController]);
  }

  private async databaseSetup(): Promise<void> {
    //await database.connect();
  }
  private setupErrorHandlers(): void {
    //this.app.use(apiErrorValidator);
  }

  public async close(): Promise<void> {
    //await database.close();
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  }
  public start(): void {
    this.app.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }
  public getApp(): Application {
    return this.app;
  }
}
