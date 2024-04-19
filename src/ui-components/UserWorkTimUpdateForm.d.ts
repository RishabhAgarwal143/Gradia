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
export declare type UserWorkTimUpdateFormInputValues = {
    Monday_start?: string;
    Monday_end?: string;
    Tuesday_start?: string;
    Tuesday_end?: string;
    Wednesday_start?: string;
    Wednesday_end?: string;
    Thurday_start?: string;
    Thurday_end?: string;
    Friday_start?: string;
    Friday_end?: string;
    Saturday_start?: string;
    Saturday_end?: string;
    Sunday_start?: string;
    Sunday_end?: string;
};
export declare type UserWorkTimUpdateFormValidationValues = {
    Monday_start?: ValidationFunction<string>;
    Monday_end?: ValidationFunction<string>;
    Tuesday_start?: ValidationFunction<string>;
    Tuesday_end?: ValidationFunction<string>;
    Wednesday_start?: ValidationFunction<string>;
    Wednesday_end?: ValidationFunction<string>;
    Thurday_start?: ValidationFunction<string>;
    Thurday_end?: ValidationFunction<string>;
    Friday_start?: ValidationFunction<string>;
    Friday_end?: ValidationFunction<string>;
    Saturday_start?: ValidationFunction<string>;
    Saturday_end?: ValidationFunction<string>;
    Sunday_start?: ValidationFunction<string>;
    Sunday_end?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserWorkTimUpdateFormOverridesProps = {
    UserWorkTimUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Monday_start?: PrimitiveOverrideProps<TextFieldProps>;
    Monday_end?: PrimitiveOverrideProps<TextFieldProps>;
    Tuesday_start?: PrimitiveOverrideProps<TextFieldProps>;
    Tuesday_end?: PrimitiveOverrideProps<TextFieldProps>;
    Wednesday_start?: PrimitiveOverrideProps<TextFieldProps>;
    Wednesday_end?: PrimitiveOverrideProps<TextFieldProps>;
    Thurday_start?: PrimitiveOverrideProps<TextFieldProps>;
    Thurday_end?: PrimitiveOverrideProps<TextFieldProps>;
    Friday_start?: PrimitiveOverrideProps<TextFieldProps>;
    Friday_end?: PrimitiveOverrideProps<TextFieldProps>;
    Saturday_start?: PrimitiveOverrideProps<TextFieldProps>;
    Saturday_end?: PrimitiveOverrideProps<TextFieldProps>;
    Sunday_start?: PrimitiveOverrideProps<TextFieldProps>;
    Sunday_end?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserWorkTimUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserWorkTimUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userWorkTim?: any;
    onSubmit?: (fields: UserWorkTimUpdateFormInputValues) => UserWorkTimUpdateFormInputValues;
    onSuccess?: (fields: UserWorkTimUpdateFormInputValues) => void;
    onError?: (fields: UserWorkTimUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserWorkTimUpdateFormInputValues) => UserWorkTimUpdateFormInputValues;
    onValidate?: UserWorkTimUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserWorkTimUpdateForm(props: UserWorkTimUpdateFormProps): React.ReactElement;
