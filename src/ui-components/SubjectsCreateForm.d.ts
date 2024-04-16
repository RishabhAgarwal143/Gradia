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
export declare type SubjectsCreateFormInputValues = {
    subject_Name?: string;
    current_Grade?: number;
    target_Grade?: number;
    Tasks?: any[];
    Schedules?: any[];
    userinfoID?: string;
    subject_Difficulty?: number;
    SyllabusGradeValues?: any[];
};
export declare type SubjectsCreateFormValidationValues = {
    subject_Name?: ValidationFunction<string>;
    current_Grade?: ValidationFunction<number>;
    target_Grade?: ValidationFunction<number>;
    Tasks?: ValidationFunction<any>;
    Schedules?: ValidationFunction<any>;
    userinfoID?: ValidationFunction<string>;
    subject_Difficulty?: ValidationFunction<number>;
    SyllabusGradeValues?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubjectsCreateFormOverridesProps = {
    SubjectsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    subject_Name?: PrimitiveOverrideProps<TextFieldProps>;
    current_Grade?: PrimitiveOverrideProps<TextFieldProps>;
    target_Grade?: PrimitiveOverrideProps<TextFieldProps>;
    Tasks?: PrimitiveOverrideProps<AutocompleteProps>;
    Schedules?: PrimitiveOverrideProps<AutocompleteProps>;
    userinfoID?: PrimitiveOverrideProps<AutocompleteProps>;
    subject_Difficulty?: PrimitiveOverrideProps<TextFieldProps>;
    SyllabusGradeValues?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type SubjectsCreateFormProps = React.PropsWithChildren<{
    overrides?: SubjectsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SubjectsCreateFormInputValues) => SubjectsCreateFormInputValues;
    onSuccess?: (fields: SubjectsCreateFormInputValues) => void;
    onError?: (fields: SubjectsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubjectsCreateFormInputValues) => SubjectsCreateFormInputValues;
    onValidate?: SubjectsCreateFormValidationValues;
} & React.CSSProperties>;
export default function SubjectsCreateForm(props: SubjectsCreateFormProps): React.ReactElement;
