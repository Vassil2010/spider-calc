export class ToServer {
    
    fromStation :string;
    toStation   :string;
    goodsWeight :number;
    goodsVolume :number;
    transportType: string = 'sea';
    goodsType: string = 'general';
    dop :string[] = [];
    goodsPrice:number;
}