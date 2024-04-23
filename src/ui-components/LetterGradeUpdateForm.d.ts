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
export declare type LetterGradeUpdateFormInputValues = {
    LetterValue?: string;
    GradeCutoff?: number;
    subjectsID?: string;
};
export declare type LetterGradeUpdateFormValidationValues = {
    LetterValue?: ValidationFunction<string>;
    GradeCutoff?: ValidationFunction<number>;
    subjectsID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LetterGradeUpdateFormOverridesProps = {
    LetterGradeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    LetterValue?: PrimitiveOverrideProps<TextFieldProps>;
    GradeCutoff?: PrimitiveOverrideProps<TextFieldProps>;
    subjectsID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LetterGradeUpdateFormProps = React.PropsWithChildren<{
    overrides?: LetterGradeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    letterGrade?: any;
    onSubmit?: (fields: LetterGradeUpdateFormInputValues) => LetterGradeUpdateFormInputValues;
    onSuccess?: (fields: LetterGradeUpdateFormInputValues) => void;
    onError?: (fields: LetterGradeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LetterGradeUpdateFormInputValues) => LetterGradeUpdateFormInputValues;
    onValidate?: LetterGradeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LetterGradeUpdateForm(props: LetterGradeUpdateFormProps): React.ReactElement;
