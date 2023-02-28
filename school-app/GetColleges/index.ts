import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AppSource } from "../Shared/app-source";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(req.headers.token);
    
    const source = new AppSource();

    const colleges = source.getColleges();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: colleges
    };

};

export default httpTrigger;