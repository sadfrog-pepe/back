/**
 * Refer to allonso's blog (https://aalonso.dev/)
 * post name: "How to generate Generics DTOs with nestjs/swagger"
 */

import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PageDto } from "src/dtos/pagination/page.dto";

export const ApiPaginatedOkResponse = <T extends Type<unknown>>(dataDto: T) =>
    applyDecorators(
        ApiExtraModels(PageDto, dataDto),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PageDto) },
                    {
                        properties: {
                            data: {
                                type: "array",
                                items: { $ref: getSchemaPath(dataDto) },
                            },
                        },
                    },
                ],
            },
        })
    );
