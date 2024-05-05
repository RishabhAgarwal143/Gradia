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
export declare type UserinfoUpdateFormInputValues = {
    name?: string;
    email?: string;
    Timezone?: string;
    Last_updated?: string;
    Schedules?: any[];
    Tasks?: any[];
    SubscribedCalendars?: any[];
    Subjects?: any[];
    UserWorkTim?: any;
};
export declare type UserinfoUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    Timezone?: ValidationFunction<string>;
    Last_updated?: ValidationFunction<string>;
    Schedules?: ValidationFunction<any>;
    Tasks?: ValidationFunction<any>;
    SubscribedCalendars?: ValidationFunction<any>;
    Subjects?: ValidationFunction<any>;
    UserWorkTim?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserinfoUpdateFormOverridesProps = {
    UserinfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    Timezone?: PrimitiveOverrideProps<TextFieldProps>;
    Last_updated?: PrimitiveOverrideProps<TextFieldProps>;
    Schedules?: PrimitiveOverrideProps<AutocompleteProps>;
    Tasks?: PrimitiveOverrideProps<AutocompleteProps>;
    SubscribedCalendars?: PrimitiveOverrideProps<AutocompleteProps>;
    Subjects?: PrimitiveOverrideProps<AutocompleteProps>;
    UserWorkTim?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type UserinfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserinfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userinfo?: any;
    onSubmit?: (fields: UserinfoUpdateFormInputValues) => UserinfoUpdateFormInputValues;
    onSuccess?: (fields: UserinfoUpdateFormInputValues) => void;
    onError?: (fields: UserinfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserinfoUpdateFormInputValues) => UserinfoUpdateFormInputValues;
    onValidate?: UserinfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserinfoUpdateForm(props: UserinfoUpdateFormProps): React.ReactElement;
