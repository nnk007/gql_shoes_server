import { DataSourceContext } from './context';
import { RATE_CHANGED_TOPIC, pubsub } from './pubsub';
import { Resolvers } from './types';

export const resolvers: Resolvers<DataSourceContext> = {
    Query: {
        shoes: (_, __, {dataSources}) => {
            const shoes = dataSources.shoesAPI.getShoes();
            return shoes;
        },
        featuredShoes:(_,__,{dataSources})=>{
            const shoes = dataSources.shoesAPI.getShoes();
            return shoes;
        }
    },
    // Shoe:{
    //     price:(shoe,_,{dataSources})=>{
    //         return shoe.price/dataSources.binanceAPI.getRate();
    //     }
    // },
    Mutation:{
        addShoe:(_,{input},{dataSources})=>{
            const shoe = input;
            const valid_images = (shoe.images.filter(url=>{
                return /http(s)?:\/\/(.*)\.(jpg|jpeg|png|webp)/.test(url)
            }))
            return dataSources.shoesAPI.addShoe({...shoe,images:valid_images});
        },
        delShoe:(_,{id},{dataSources})=>{;
            return dataSources.shoesAPI.delShoe(id);
        },
        delShoes:(_,{ids},{dataSources})=>{
            let ret = [];
            for(let id of ids){
                ret.push(dataSources.shoesAPI.delShoe(id));
            }
            return ret;
        }
    },
    Subscription:{
        rateChanged:{
            //@ts-expect-error
            subscribe: ()=>pubsub.asyncIterator(RATE_CHANGED_TOPIC)
        }
    }
}