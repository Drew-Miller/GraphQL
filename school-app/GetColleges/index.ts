import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CollegeSource } from "../Shared/college-source";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const collegeSource = new CollegeSource();

    const colleges = collegeSource.get();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: colleges
    };

};

export default httpTrigger;