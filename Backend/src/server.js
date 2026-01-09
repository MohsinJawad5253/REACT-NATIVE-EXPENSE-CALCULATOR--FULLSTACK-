import express from "express"
import dotenv from "dotenv"
import { sql, initDB } from "./Config/db.js"
import ratelimiter from "./middleware/Ratelimiter.js"
import transactionsRoute from "./Routes/transactionRoutes.js"
import job from "./Config/cron.js"

dotenv.config()
const app = express()

if (process.env.NODE_ENV === "production") job.start()


app.use(express.json())
app.use(ratelimiter)

const PORT = process.env.PORT || 5001



app.get("/", (req, res) => {
    res.send("SERVER IS UP ON 5001 PORT 👍")
})
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.use("/api/transactions", transactionsRoute)


console.log("PORT:", PORT)

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Up on ${PORT} 👍👍`)
    });
})