import { Expense } from "@/app/database/models/expense";
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
          totalExpense: [
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
              $group: {
                _id: {
                  month: {
                    $month: "$createdAt",
                  },
                },
                total: {
                  $sum: "$amount",
                },
              },
            },
          ],
        },
      },
    ]);
  }
}
