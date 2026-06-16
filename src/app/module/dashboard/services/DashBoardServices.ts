import { DashboardRepository } from "../repositories/DashboardRepositeries";

export class DashBoardServices {
  constructor(private dashboardRespositery: DashboardRepository) {}

  async getDashBoardDetail(userId: string) {
    if (!userId) {
      throw new Error("Id is not defined ");
    }

    const [result]=await this.dashboardRespositery.getDashboardStatus(userId);
    const totalIncome=result.totalIncome[0]?.total ||0;
     const totalExpense=result.totalExpense[0]?.total ||0;
     const totalBalance=totalIncome-totalExpense;



    return {
      totalIncome,
        totalExpense,
        totalBalance,
        categoryExpense:result.categoryExpense,
        monthlyExpense:result.monthlyExpense,
        recentTransactions:result.recentTransactions
    }

}
}
