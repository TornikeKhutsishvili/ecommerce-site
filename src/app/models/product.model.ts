export class dummyProductModel {
    id: number = 0;
    title: string = '';
    description: string = '';
    price: number = 0;
    discountPercentage: number = 0;
    rating: number = 0;
    stock: number = 0;
    brand: string = '';
    category: string = '';
    thumbnail: string = '';
    images: string[] = [];
    tags: string[] = [];
    sku: string = '';
    availabilityStatus: string = '';
    returnPolicy: string = '';
    shippingInformation: string = '';
    warrantyInformation: string = '';
    minimumOrderQuantity: number = 0;
    weight: number = 0;

    // Dimensions is an object with width, height, depth
    dimensions: {
        width: number;
        height: number;
        depth: number;
    } = { width: 0, height: 0, depth: 0 };

    // Meta information
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    } = {
            createdAt: '',
            updatedAt: '',
            barcode: '',
            qrCode: ''
        };

    // Reviews array (can be typed better if structure is known)
    reviews: any[] = [];
}


export class DummyApiResponse {
    products: dummyProductModel[] = [];
    total: number = 0;
    skip: number = 0;
    limit: number = 0;
}
