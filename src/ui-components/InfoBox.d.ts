/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InfoBoxOverridesProps = {
    InfoBox?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 1"?: PrimitiveOverrideProps<ViewProps>;
    "Title :"?: PrimitiveOverrideProps<TextProps>;
    "Event Name"?: PrimitiveOverrideProps<TextProps>;
    "Summary :"?: PrimitiveOverrideProps<TextProps>;
    Summary?: PrimitiveOverrideProps<TextProps>;
    "Start :"?: PrimitiveOverrideProps<TextProps>;
    "Start date"?: PrimitiveOverrideProps<TextProps>;
    "End date"?: PrimitiveOverrideProps<TextProps>;
    "End :"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type InfoBoxProps = React.PropsWithChildren<Partial<ViewProps> & {
    ID?: any;
} & {
    overrides?: InfoBoxOverridesProps | undefined | null;
}>;
export default function InfoBox(props: InfoBoxProps): React.ReactElement;
