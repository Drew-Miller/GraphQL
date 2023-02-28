import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AppSource } from "../Shared/app-source";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(req.headers.token);
    const id = req.query.id || req.body.id;
    console.log(id);
    
    const source = new AppSource();

    const students = source.getStudent(id);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: students
    };
};

export default httpTrigger;