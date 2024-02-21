/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TaskCreateFormInputValues = {
    due_time?: string;
    due_date?: string;
    description?: string;
    UID?: string;
    DTSTART?: string;
    DUE?: string;
    SUMMARY?: string;
    COMPLETED?: string;
    STATUS?: string;
    CATEGORIES?: string;
    PRIORITY?: number;
    DTSTAMP?: string;
    Importance?: any;
};
export declare type TaskCreateFormValidationValues = {
    due_time?: ValidationFunction<string>;
    due_date?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    UID?: ValidationFunction<string>;
    DTSTART?: ValidationFunction<string>;
    DUE?: ValidationFunction<string>;
    SUMMARY?: ValidationFunction<string>;
    COMPLETED?: ValidationFunction<string>;
    STATUS?: ValidationFunction<string>;
    CATEGORIES?: ValidationFunction<string>;
    PRIORITY?: ValidationFunction<number>;
    DTSTAMP?: ValidationFunction<string>;
    Importance?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TaskCreateFormOverridesProps = {
    TaskCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    due_time?: PrimitiveOverrideProps<TextFieldProps>;
    due_date?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    UID?: PrimitiveOverrideProps<TextFieldProps>;
    DTSTART?: PrimitiveOverrideProps<TextFieldProps>;
    DUE?: PrimitiveOverrideProps<TextFieldProps>;
    SUMMARY?: PrimitiveOverrideProps<TextFieldProps>;
    COMPLETED?: PrimitiveOverrideProps<TextFieldProps>;
    STATUS?: PrimitiveOverrideProps<TextFieldProps>;
    CATEGORIES?: PrimitiveOverrideProps<TextFieldProps>;
    PRIORITY?: PrimitiveOverrideProps<TextFieldProps>;
    DTSTAMP?: PrimitiveOverrideProps<TextFieldProps>;
    Importance?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TaskCreateFormProps = React.PropsWithChildren<{
    overrides?: TaskCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TaskCreateFormInputValues) => TaskCreateFormInputValues;
    onSuccess?: (fields: TaskCreateFormInputValues) => void;
    onError?: (fields: TaskCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TaskCreateFormInputValues) => TaskCreateFormInputValues;
    onValidate?: TaskCreateFormValidationValues;
} & React.CSSProperties>;
export default function TaskCreateForm(props: TaskCreateFormProps): React.ReactElement;
