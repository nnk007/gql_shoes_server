import { BinanceAPI } from "./datasources/binance_api";
import { ShoesAPI } from "./datasources/shoes_api";
export type DataSourceContext = { dataSources: {
		shoesAPI: ShoesAPI;
        binanceAPI:BinanceAPI
	};
};