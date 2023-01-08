/**
 * Developed From @nestjs/swagger/.../inersction-type.helper.ts
 */

import { Type } from "@nestjs/common";

import {
    inheritPropertyInitializers,
    inheritValidationMetadata,
    inheritTransformationMetadata,
} from "@nestjs/mapped-types";
import { DECORATORS } from "@nestjs/swagger/dist/constants";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { ModelPropertiesAccessor } from "@nestjs/swagger/dist/services/model-properties-accessor";
import { clonePluginMetadataFactory } from "@nestjs/swagger/dist/type-helpers/mapped-types.utils";

const modelPropertiesAccessor = new ModelPropertiesAccessor();

export function MultiIntersectionType<T extends Type[]>(...classRefs: T) {
    var __fieldsOfClassRefs: [string, any][] = new Array();
    classRefs.forEach((classRef) =>
        modelPropertiesAccessor
            .getModelProperties(classRef.prototype)
            .forEach((propertyKey) => {
                __fieldsOfClassRefs.push([propertyKey, classRef.prototype]);
            })
    );

    abstract class MultiIntersectionTypeClass {
        constructor() {
            classRefs.forEach((classRef) => {
                inheritPropertyInitializers(this, classRef);
            });
        }
    }

    classRefs.forEach((classRef) => {
        inheritValidationMetadata(classRef, MultiIntersectionTypeClass);
        inheritTransformationMetadata(classRef, MultiIntersectionTypeClass);
    });

    classRefs.forEach((classRef) =>
        clonePluginMetadataFactory(
            MultiIntersectionTypeClass as Type<unknown>,
            classRef.prototype
        )
    );

    __fieldsOfClassRefs.forEach((tuple) => {
        const [propertyKey, prototype] = tuple;
        const metadata = Reflect.getMetadata(
            DECORATORS.API_MODEL_PROPERTIES,
            prototype,
            propertyKey
        );
        const decoratorFactory = ApiProperty(metadata);
        decoratorFactory(MultiIntersectionTypeClass.prototype, propertyKey);
    });

    const intersectedNames = classRefs.reduce(
        (prev, ref) => prev + ref.name,
        ""
    );
    Object.defineProperty(MultiIntersectionTypeClass, "name", {
        value: `MultiIntersection${intersectedNames}`,
    });
    return MultiIntersectionTypeClass as Type<T>;
}
