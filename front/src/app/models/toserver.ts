export class ToServer {
    
    fromStation :string;
    toStation   :string;
    goodsWeight :number;
    goodsVolume :number;
    transportType: string = 'sea';
    dop :string[] = [];
    goodsPrice:number;
}