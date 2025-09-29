import { StatusCodes } from "http-status-codes"

import express, { Request, Response } from "express"

import { PORT } from "./utils"

const app = express()

app.get("/", (req: Request, res: Response) => {
   res.status(StatusCodes.OK).json({
      success: true,
      message: "Cake Backend is Live",
   })
})

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`)
})
