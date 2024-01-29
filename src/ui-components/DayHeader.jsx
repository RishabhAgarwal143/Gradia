/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function DayHeader(props) {
  const { Day = "SUN", overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="row"
      width="38.29px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="4px 4px 4px 4px"
      {...getOverrideProps(overrides, "DayHeader")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="10px"
        fontWeight="600"
        color="rgba(113,113,122,1)"
        lineHeight="16px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={Day}
        {...getOverrideProps(overrides, "Day")}
      ></Text>
    </Flex>
  );
}
