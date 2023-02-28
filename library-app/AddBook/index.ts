import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AppSource } from "../Shared/app-source";
import { CreateBook } from "../Shared/dto";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const dto = req.body as CreateBook;
    
    const source = new AppSource()

    const res = source.addBook(dto);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: res
    };

};

export default httpTrigger;