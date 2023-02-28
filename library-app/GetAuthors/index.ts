import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AppSource } from "../Shared/app-source";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(req.headers.token);
    
    const source = new AppSource();

    const authors = source.getAuthors();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: authors
    };

};

export default httpTrigger;