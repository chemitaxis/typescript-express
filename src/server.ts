import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express, { NextFunction, Request, Response } from 'express';
import methodOverride from 'method-override';
import * as NE from 'node-exceptions';
import path from 'path';

export class Server {
  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   */
  public static bootstrap(): Server {
    return new Server();
  }

  public readonly app: express.Application;

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // create expressjs application
    this.app = express();
    this.app.listen(4000);
    // configure application
    this.config();

    // add routes
    this.routes();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());
    // add static paths
    this.app.use(express.static(path.join(__dirname, 'public')));

    // catch 500 errors and forward to error handler
    this.app.use(
      // tslint:disable-next-line:variable-name
      (err: Error, _req: Request, _res: Response, next: NextFunction) => {
        next(new NE.HttpException(err.message, 500));
      }
    );

    // error handling
    this.app.use(errorHandler());
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes(): void {
    const router: express.Router = express.Router();

    // // use router middleware
    router.get(
      '/online',
      // tslint:disable-next-line:variable-name
      (_req: Request, res: Response, _next: NextFunction) => {
        res.status(200).json({ online: true });
      }
    );

    // use router middleware
    router.get(
      '/offline',
      // tslint:disable-next-line:variable-name
      (_req: Request, res: Response, _next: NextFunction) => {
        res.status(200).json({ online: true });
      }
    );

    // use router middleware
    router.get(
      '/error',
      // tslint:disable-next-line:variable-name
      (_req: Request, _res: Response, _next: NextFunction) => {
        throw new Error('System error!!');
      }
    );

    // catch 404 and forward to error handler
    // tslint:disable-next-line:variable-name
    router.use((_req: Request, res: Response, _next: NextFunction) => {
      res.status(404).json({ error: 'Page not found!!' });
    });

    // use router middleware
    this.app.use(router);
  }
}
