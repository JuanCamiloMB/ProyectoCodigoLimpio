export class Product{
    constructor(
        public _id:string,
        public nombre:string,
        public tipo:string,
        public precio:number,
        public cantidad:number,
        public caracteristicas:string,
        public imagen:string
    ){}
}