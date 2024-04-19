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
export declare type SyllabusGradeValuesCreateFormInputValues = {
    category_Name?: string;
    category_Grade?: number;
    Tasks_associated?: number;
    each_Task_weightage?: number;
    subjectsID?: string;
    TaskGradeInfos?: any[];
};
export declare type SyllabusGradeValuesCreateFormValidationValues = {
    category_Name?: ValidationFunction<string>;
    category_Grade?: ValidationFunction<number>;
    Tasks_associated?: ValidationFunction<number>;
    each_Task_weightage?: ValidationFunction<number>;
    subjectsID?: ValidationFunction<string>;
    TaskGradeInfos?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SyllabusGradeValuesCreateFormOverridesProps = {
    SyllabusGradeValuesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    category_Name?: PrimitiveOverrideProps<TextFieldProps>;
    category_Grade?: PrimitiveOverrideProps<TextFieldProps>;
    Tasks_associated?: PrimitiveOverrideProps<TextFieldProps>;
    each_Task_weightage?: PrimitiveOverrideProps<TextFieldProps>;
    subjectsID?: PrimitiveOverrideProps<AutocompleteProps>;
    TaskGradeInfos?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type SyllabusGradeValuesCreateFormProps = React.PropsWithChildren<{
    overrides?: SyllabusGradeValuesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SyllabusGradeValuesCreateFormInputValues) => SyllabusGradeValuesCreateFormInputValues;
    onSuccess?: (fields: SyllabusGradeValuesCreateFormInputValues) => void;
    onError?: (fields: SyllabusGradeValuesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SyllabusGradeValuesCreateFormInputValues) => SyllabusGradeValuesCreateFormInputValues;
    onValidate?: SyllabusGradeValuesCreateFormValidationValues;
} & React.CSSProperties>;
export default function SyllabusGradeValuesCreateForm(props: SyllabusGradeValuesCreateFormProps): React.ReactElement;
