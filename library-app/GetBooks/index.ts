import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { BookSource } from "../Shared/book-source";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const bookSource = new BookSource();
    
    const books = bookSource.get();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: books
    };

};

export default httpTrigger;