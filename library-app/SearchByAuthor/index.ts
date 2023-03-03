import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AppSource } from "../Shared/app-source";

type Request = {
    name: string
};

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(req.headers.token);

    const name = (req.query.name || (req.body && req.body.name));
    
    if (!name) {
        context.res = {
            body: []
        }
        return;
    }

    const appSource = new AppSource();

    const results = appSource.searchByAuthor(name);

    context.res = {
        body: results
    }
};

export default httpTrigger;