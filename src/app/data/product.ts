export class Product {
    _id!: string;
    name!: string;
    description!: string;
    price!: number;
    category!: string;
    inStock!: number;
    sold!: number;
    addedToCart!: boolean

    constructor(_id: string, name: string, description: string, price: number, category: string, inStock: number, sold: number, addedToCart: boolean) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.inStock = inStock;
        this.sold = sold;
        this.addedToCart = addedToCart;
    }
}