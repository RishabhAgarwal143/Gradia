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
export declare type LetterGradeCreateFormInputValues = {
    LetterValue?: string;
    GradeCutoff?: number;
    subjectsID?: string;
};
export declare type LetterGradeCreateFormValidationValues = {
    LetterValue?: ValidationFunction<string>;
    GradeCutoff?: ValidationFunction<number>;
    subjectsID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LetterGradeCreateFormOverridesProps = {
    LetterGradeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    LetterValue?: PrimitiveOverrideProps<TextFieldProps>;
    GradeCutoff?: PrimitiveOverrideProps<TextFieldProps>;
    subjectsID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LetterGradeCreateFormProps = React.PropsWithChildren<{
    overrides?: LetterGradeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LetterGradeCreateFormInputValues) => LetterGradeCreateFormInputValues;
    onSuccess?: (fields: LetterGradeCreateFormInputValues) => void;
    onError?: (fields: LetterGradeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LetterGradeCreateFormInputValues) => LetterGradeCreateFormInputValues;
    onValidate?: LetterGradeCreateFormValidationValues;
} & React.CSSProperties>;
export default function LetterGradeCreateForm(props: LetterGradeCreateFormProps): React.ReactElement;
