import { Shoe } from "../types";

type MockDBShoe = Shoe;


const nikeAF1:MockDBShoe = {
    id:"315122-111/CW2288-111",
    brand:"Nike",
    name:"Air Force 1 Low White '07",
    images:["https://images.stockx.com/360/Nike-Air-Force-1-Low-White-07/Images/Nike-Air-Force-1-Low-White-07/Lv2/img01.jpg"],
    price:110, //usd, hardcode cuz manual verification to get API key
    description:`The Nike Air Force 1 Low White ‘07 features an all-white leather upper with a perforated toe box and Swoosh overlays. A Nike heel embroidery and white sole completes the design. The Nike Air Force 1 Low White ‘07 originally released in 2007, but since it is an essential colorway to the brand, it consistently restocks.`
}
const nikeAF1SupremeWhite:MockDBShoe = {
    id:"CU9225-100",
    brand:"Nike",
    name:"Air Force 1 Low Supreme White",
    images:["https://images.stockx.com/360/Nike-Air-Force-1-Low-Supreme-Box-Logo-White/Images/Nike-Air-Force-1-Low-Supreme-Box-Logo-White/Lv2/img01.jpg"],
    price:200,
    description:`Supreme and Nike paid homage to an NYC classic with the release of the Nike Air Force 1 Low Supreme White, now available on StockX. This collaboration adds Supreme’s world-renowned Box Logo to the side of a traditional all-white Air Force 1 design. This Air Force 1 Low is comprised of an all-white leather upper with matching soles and detailing. A red Supreme Box Logo placed on the outside heel completes the design. These sneakers released in March of 2020 and retailed for $118.`
}
const nikeAF1SupremeBlack:MockDBShoe = {
    id:"573488-090",
    brand:"Nike",
    name:"Air Force 1 Low Supreme Black",
    images:["https://images.stockx.com/360/Nike-Air-Force-1-Low-08-NRG-Supreme-NY-Black-2012/Images/Nike-Air-Force-1-Low-08-NRG-Supreme-NY-Black-2012/Lv2/img01.jpg"],
    price:1200,
    description:``
}
const nikeAF1SupremeJW:MockDBShoe = {
    id:"315088-571",
    brand:"Nike",
    name:"Air Force 1 Low Supreme Jamaal Wilkes",
    images:["https://images.stockx.com/360/Nike-Air-Force-1-Low-Supreme-Jamaal-Wilkes/Images/Nike-Air-Force-1-Low-Supreme-Jamaal-Wilkes/Lv2/img01.jpg"],
    price:280,
    description:``
}
const mockDB = new Map<string,MockDBShoe>([[nikeAF1.id,nikeAF1],[nikeAF1SupremeWhite.id,nikeAF1SupremeWhite],[nikeAF1SupremeBlack.id,nikeAF1SupremeBlack],[nikeAF1SupremeJW.id,nikeAF1SupremeJW]]);

export class ShoesAPI {
    getShoes():MockDBShoe[]{
        return [...mockDB.values()];
    }
    getShoe(id:string):MockDBShoe|null {
        return mockDB.get(id);
    }
    addShoe(shoe:MockDBShoe){
        mockDB.set(shoe.id,shoe);
        return mockDB.get(shoe.id);
    }
    delShoe(id:string):boolean{
        return mockDB.delete(id);
    }
}