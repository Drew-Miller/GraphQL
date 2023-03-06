import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AppSource } from "../Shared/app-source";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(req.headers.token);

    const value = (req.query.value || (req.body && req.body.value));
    
    if (!value) {
        context.res = {
            body: []
        }
        return;
    }

    const appSource = new AppSource();

    const results = appSource.search(value);

    context.res = {
        body: results
    }
};

export default httpTrigger;