import genericProxyHandler from "utils/proxy/handlers/generic"; 
import { asJson } from "utils/proxy/api-helpers";

const widget = {

    api: "{url}/api/{endpoint}?apikey={key}&accept=application/json",
    proxyHandler: genericProxyHandler,

    mappings: {
        queue: {
            endpoint: "v3/Queue",
            map: (data) =>
                asJson(data).map((entry) => ({
                    total: entry.TotalCount,
                    running: entry.CurrentlyExecuting.length,
                })),
        },
        stats: {
            endpoint: "v3/Dashboard/Stats",
            map: (data) =>
                asJson(data).map((entry) => ({
                    fileCount: entry.FileCount,
                    seriesCount: entry.SeriesCount,
                    unrecognizedFiles: entry.UnrecognizedFiles,
                })),
        },
    },
};

export default widget;