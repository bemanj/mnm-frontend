
export interface SalesReport {
    salesOrderID: number;
    orderDate: Date;
    onlineOrderFlag: boolean;
    salesOrderNumber: string;
    subTotal: number;
    taxAmt: number;
    freight: number;
    totalDue: number;
    comment: string;
  }