import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AuthorSource } from "../Shared/author-source";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const authorSource = new AuthorSource();

    const authors = authorSource.get();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: authors
    };

};

export default httpTrigger;