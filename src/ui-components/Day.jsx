/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function Day(props) {
  const { day = "DEF", Date = "00", overrides, ...rest } = props;
  return (
    <Flex
      gap="0"
      direction="column"
      width="144.57px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="4px 8px 16px 8px"
      backgroundColor="rgba(250,250,250,1)"
      {...getOverrideProps(overrides, "Day")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="10px"
        fontWeight="700"
        color="rgba(113,113,122,1)"
        lineHeight="12px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={day}
        {...getOverrideProps(overrides, "SUN")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="22px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="32px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={Date}
        {...getOverrideProps(overrides, "21")}
      ></Text>
    </Flex>
  );
}
