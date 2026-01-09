import express from "express"
import { gatTransactionsByUserId, createTrasaction, deleteTransaction, getSummaryByUserId } from "../Controllers/transactionController.js"

const router = express.Router()

router.get("/:userId", gatTransactionsByUserId)
router.post("/", createTrasaction)
router.delete("/:id", deleteTransaction)
router.get("/summary/:userId", getSummaryByUserId)

export default router