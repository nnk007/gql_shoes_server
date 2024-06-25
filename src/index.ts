import { ApolloServer } from "@apollo/server";
import express from "express"
import cors from "cors";
import { ExpressMiddlewareOptions, expressMiddleware } from "@apollo/server/express4"
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { DataSourceContext } from "./context";
import { ShoesAPI } from "./datasources/shoes_api";
import { BinanceAPI } from "./datasources/binance_api";
async function main() {
    const app = express();
    app.use((_, res, next) => { res.removeHeader('X-Powered-By'); next() });
    const httpServer = createServer(app);
    const wsServer = new WebSocketServer({
        server:httpServer,
        path:"/graphql"
    })
    const schema = makeExecutableSchema({typeDefs,resolvers});
    const serverCleanup = useServer({schema},wsServer);
    const server = new ApolloServer<DataSourceContext>({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
            {
                async serverWillStart() {
                    return {
                        async drainServer(){
                            await serverCleanup.dispose()
                        }
                    }
                },
            }
        ]
    });
    const options: ExpressMiddlewareOptions<DataSourceContext> = {
        context: async () => ({
            dataSources:{
                shoesAPI:new ShoesAPI(),
                binanceAPI:new BinanceAPI()
            }
        })
    }
    await server.start();
    /*  */
    app.use("/graphql",cors(), express.json(), expressMiddleware<DataSourceContext>(server, {context:options.context}));
    httpServer.listen(4000,()=>{
        console.log(`Listening on :${4000}`);
        console.log(`Apollo GraphQL on http://localhost:${4000}/graphql`);
    })

}


main();