/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
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
export declare type HourRowOverridesProps = {
    HourRow?: PrimitiveOverrideProps<FlexProps>;
    Time1429?: PrimitiveOverrideProps<TextProps>;
    Blocks?: PrimitiveOverrideProps<FlexProps>;
    "60 Block12306"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12307"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12308"?: PrimitiveOverrideProps<FlexProps>;
    "60 Block12303"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12304"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12305"?: PrimitiveOverrideProps<FlexProps>;
    "60 Block12300"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12301"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12302"?: PrimitiveOverrideProps<FlexProps>;
    "60 Block12297"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12298"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12299"?: PrimitiveOverrideProps<FlexProps>;
    "60 Block12294"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12295"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12296"?: PrimitiveOverrideProps<FlexProps>;
    "60 Block12291"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12292"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12293"?: PrimitiveOverrideProps<FlexProps>;
    "60 Block12288"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12289"?: PrimitiveOverrideProps<FlexProps>;
    "30 Block12290"?: PrimitiveOverrideProps<FlexProps>;
    Time1438?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type HourRowProps = React.PropsWithChildren<Partial<FlexProps> & {
    Time?: String;
    Event?: any;
} & {
    overrides?: HourRowOverridesProps | undefined | null;
}>;
export default function HourRow(props: HourRowProps): React.ReactElement;
