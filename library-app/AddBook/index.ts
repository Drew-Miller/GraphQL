import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AuthorSource } from "../Shared/author-source";
import { BookSource } from "../Shared/book-source";
import { CreateBook } from "../Shared/dto";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const dto = req.body as CreateBook;
    
    const bookSource = new BookSource();
    const authorSource = new AuthorSource();

    const res = bookSource.addBook(dto, authorSource);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: res
    };

};

export default httpTrigger;