import cors from "cors"
import helmet from "helmet"
import contentSecurityPolicy from "helmet-csp"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import swaggerUi from "swagger-ui-express"

import express, { Application, Request, Response, Router } from "express"

import { Routes } from "./routes"
import { noAsyncHandler } from "./utils/async-handler.middleware"
import { CONNECT_DB } from "./utils/database.config"
import { errorMiddleware } from "./utils/error.middleware"
import { HttpException } from "./utils/http.exception"
import { ENVIRONMENT, IP, ORIGIN } from "./utils/secrets"

export class App {
   public app: Application

   public constructor() {
      this.app = express()

      void CONNECT_DB()

      this.initializeConfig()
      this.initializeControllers()
      this.initializeErrorHandling()
   }

   private initializeConfig(): void {
      this.app.set("trust proxy", `loopback, ${IP}`)
      this.app.use(
         cors({
            origin: ENVIRONMENT === "development" ? "*" : ORIGIN,
            credentials: true,
         }),
      )
      // this.app.use(
      //   cors({
      //     origin: [
      //       'http://localhost:6660',
      //       'http://localhost:5000',
      //       'https://romay.edumansim.uz',
      //       'http://localhost:5173',
      //     ],
      //     credentials: true,
      //   }),
      // )

      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))
      this.app.use(helmet())
      this.app.use(
         contentSecurityPolicy({ useDefaults: true, reportOnly: false }),
      )

      if (ENVIRONMENT === "development") {
         const apiCeo = require("./utils/swagger.json")
         this.app.use(
            "/api-docs/",
            swaggerUi.serveFiles(apiCeo),
            swaggerUi.setup(apiCeo),
         )
      }
   }

   private initializeControllers(): void {
      this.app.get(
         "/",
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
      this.app.use("*", () => {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND,
            "Endpoint not found!",
         )
      })
   }

   private initializeErrorHandling(): void {
      this.app.use(errorMiddleware)
   }
}
