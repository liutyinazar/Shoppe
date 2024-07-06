export interface JewelryCategory {
    id: number;
    title: string;
}

export interface JewelryImage {
    id: number;
    jewelry: number;
    image: string;
    created_at: string;
}

export interface Review {
    id: number;
    jewelry: number;
    rating: number; 
    comment: string;
    created_at: string;
}

export interface Jewelry {
    id: number;
    title: string;
    price: number;
    description: string;
    category: JewelryCategory;
    created_at: string;
    discount: number;
    images: JewelryImage[];
    reviews: Review[];
    quantity: number;
}
