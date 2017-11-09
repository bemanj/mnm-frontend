export class SalesOrder {
    $id: number;
    SONumber: string;
    SalesOrderID: number;
    Customer: string;
    OnlineOrderFlag: boolean;
    SalesOrderNumber: string;
    SubTotal: number;
    TaxAmt: number;
    Freight: number;
    TotalDue: number;
    Comment: string;

     get SONum(){
      return this.SONumber;
    }

     get SOId(){
      return this.SalesOrderID;
    }


}
