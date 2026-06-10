import { DashboardRepository } from "../repositories/DashboardRepositeries";

export class DashBoardServices {
  constructor(private dashboardRespositery: DashboardRepository) {}

  async getDashBoardDetail(userId: string) {
    if (!userId) {
      throw new Error("Id is not defined ");
    }

    const [result]=await this.dashboardRespositery.getDashboardStatus(userId);


    return {
        totalExpense:result.totalExpense[0]?.total||0,
        categoryExpense:result.categoryExpense,
        monthlyExpense:result.monthlyExpense
    }

}
}
