export class WashingProgramModel{
    id:number;
    programNumber: string;
    name:string;
    description:string;
    price:number;
    steps:{id:number, order:number, name:string}[];
    constructor(id:number,name:string,description:string, price:number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}