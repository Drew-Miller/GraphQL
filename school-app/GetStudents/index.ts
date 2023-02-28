import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AppSource } from "../Shared/app-source";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const source = new AppSource();

    const students = source.getStudents();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: students
    };

};

export default httpTrigger;