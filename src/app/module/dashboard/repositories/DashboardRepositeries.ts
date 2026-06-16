import { Expense } from "@/database/models/expense";
import mongoose from "mongoose";

export class DashboardRepository {
  async getDashboardStatus(userId: string) {
    return Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $facet: {
          totalIncome: [
            {
              $match: {
                type: "income",
              },
            },
            {
              $group: {
                _id: null,
                total: {
                  $sum: "$amount",
                },
              },
            },
          ],

          totalExpense: [
            {
              $match: {
                type: "expense",
              },
            },
            {
              $group: {
                _id: null,
                total: {
                  $sum: "$amount",
                },
              },
            },
          ],

          categoryExpense: [
            {
              $match: {
                type: "expense",
              },
            },
            {
              $group: {
                _id: "$category",
                total: {
                  $sum: "$amount",
                },
              },
            },
          ],

          monthlyExpense: [
            {
              $match: {
                type: "expense",
              },
            },
            {
              $group: {
                _id: {
                  month: {
                    $month: "$expenseDate",
                  },
                },
                total: {
                  $sum: "$amount",
                },
              },
            },
          ],

          recentTransactions: [
            {
              $sort: {
                expenseDate: -1,
              },
            },
            {
              $limit: 5,
            },
          ],
        },
      },
    ]);
  }
} 