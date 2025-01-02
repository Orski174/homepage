import genericProxyHandler from "utils/proxy/handlers/generic";
import { asJson } from "utils/proxy/api-helpers";

const widget = {
    api: "{url}/api/{endpoint}?apikey={key}&accept=application/json",
    proxyHandler: genericProxyHandler,

    mappings: {
        queue: {
            endpoint: "v3/Queue",
            map: (data) => {
                const dataString = data.toString('utf8');
                const jsonData = asJson(dataString);
                return [{
                  total: jsonData.TotalCount,
                  running: jsonData.CurrentlyExecuting.length,
              }];
            },
        },
        stats: {
            endpoint: "v3/Dashboard/Stats",
            map: (data) => {
                const dataString = data.toString('utf8');
                const jsonData = asJson(dataString);
                return [{
                  seriesCount: jsonData.SeriesCount,
                  unrecognizedFiles: jsonData.UnrecognizedFiles,
              }];
            },
        },
    },
};

export default widget;
