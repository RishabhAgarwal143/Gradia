/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type UserinfoCreateFormInputValues = {
    name?: string;
    email?: string;
};
export declare type UserinfoCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserinfoCreateFormOverridesProps = {
    UserinfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserinfoCreateFormProps = React.PropsWithChildren<{
    overrides?: UserinfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserinfoCreateFormInputValues) => UserinfoCreateFormInputValues;
    onSuccess?: (fields: UserinfoCreateFormInputValues) => void;
    onError?: (fields: UserinfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserinfoCreateFormInputValues) => UserinfoCreateFormInputValues;
    onValidate?: UserinfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserinfoCreateForm(props: UserinfoCreateFormProps): React.ReactElement;
