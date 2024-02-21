/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ImportanceCreateFormInputValues = {
    Grade_Percentage?: string;
    Task_info?: string;
    Expected_Time?: string;
    Course?: string;
    Additional_Info?: string;
};
export declare type ImportanceCreateFormValidationValues = {
    Grade_Percentage?: ValidationFunction<string>;
    Task_info?: ValidationFunction<string>;
    Expected_Time?: ValidationFunction<string>;
    Course?: ValidationFunction<string>;
    Additional_Info?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ImportanceCreateFormOverridesProps = {
    ImportanceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Grade_Percentage?: PrimitiveOverrideProps<TextFieldProps>;
    Task_info?: PrimitiveOverrideProps<TextFieldProps>;
    Expected_Time?: PrimitiveOverrideProps<TextFieldProps>;
    Course?: PrimitiveOverrideProps<TextFieldProps>;
    Additional_Info?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ImportanceCreateFormProps = React.PropsWithChildren<{
    overrides?: ImportanceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ImportanceCreateFormInputValues) => ImportanceCreateFormInputValues;
    onSuccess?: (fields: ImportanceCreateFormInputValues) => void;
    onError?: (fields: ImportanceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ImportanceCreateFormInputValues) => ImportanceCreateFormInputValues;
    onValidate?: ImportanceCreateFormValidationValues;
} & React.CSSProperties>;
export default function ImportanceCreateForm(props: ImportanceCreateFormProps): React.ReactElement;
