import { Customer } from "../customer/customer.module";
import { WashingProgramModel } from "../washing-programs/washing-program.model";

export class WashingModel{
    public id: number;
    public washingProgramId:number;
    public program:WashingProgramModel;
    public customerId:number;
    public customer:Customer;
    public basePrice: number;
    public discount: number;
    public discountFormatted: number;
    public totalPrice: number;
    public status: string;
}