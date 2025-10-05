import cors from 'cors'
import helmet from 'helmet'
import contentSecurityPolicy from 'helmet-csp'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import swaggerUi from 'swagger-ui-express'

import express, { Application, Request, Response, Router } from 'express'

import { Routes } from './routes'
import {
   CONNECT_DB,
   HttpException,
   IP,
   errorMiddleware,
   noAsyncHandler,
} from './utils'

export class App {
   public app: Application

   public constructor() {
      this.app = express()

      void CONNECT_DB()

      this.initializeConfig()
      this.initializeDocumentation()
      this.initializeControllers()
      this.initializeErrorHandling()
   }

   private initializeConfig(): void {
      this.app.set('trust proxy', `loopback, ${IP}`)
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))
      this.app.use(helmet())
      this.app.use(
         contentSecurityPolicy({ useDefaults: true, reportOnly: false }),
      )
      this.app.use(
         cors({
            origin: '*',
            credentials: true,
         }),
      )
   }

   private initializeDocumentation(): void {
      const swaggerDocument = require('./swaggers')
      this.app.use(
         '/api-docs/',
         swaggerUi.serveFiles(swaggerDocument),
         swaggerUi.setup(swaggerDocument),
      )
   }

   private initializeControllers(): void {
      this.app.get(
         '/',
         noAsyncHandler((req: Request, res: Response) =>
            res.status(StatusCodes.OK).json({
               success: true,
               msg: ReasonPhrases.OK,
            }),
         ),
      )
      Routes.forEach((controller: { path: string; router: Router }) => {
         this.app.use(controller.path, controller.router)
      })
      this.app.use('*', () => {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND,
            'Endpoint not found!',
         )
      })
   }

   private initializeErrorHandling(): void {
      this.app.use(errorMiddleware)
   }
}
