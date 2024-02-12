/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
export default function InfoBox(props) {
  const { ID, overrides, ...rest } = props;
  return (
    <View
      width="404px"
      height="268px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(249,246,246,0.95)"
      {...getOverrideProps(overrides, "InfoBox")}
      {...rest}
    >
      <View
        width="419.79px"
        height="279.05px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="-4.12%"
        left="0%"
        right="-3.91%"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        borderRadius="15px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(244,252,253,1)"
        {...getOverrideProps(overrides, "Rectangle 1")}
      ></View>
      <Text
        fontFamily="Inter"
        fontSize="8px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="9.681818008422852px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="54px"
        height="11px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="29px"
        left="25px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Title                 :"
        {...getOverrideProps(overrides, "Title :")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="8px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="9.681818008422852px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="302px"
        height="36px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="29px"
        left="87px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={ID?.SUMMARY}
        {...getOverrideProps(overrides, "Event Name")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="8px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="9.681818008422852px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="56px"
        height="12px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="70px"
        left="23px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Summary       :"
        {...getOverrideProps(overrides, "Summary :")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="8px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="9.681818008422852px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="310px"
        height="53px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="70px"
        left="87px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={ID?.DESCRIPTION}
        {...getOverrideProps(overrides, "Summary")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="8px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="9.681818008422852px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="54px"
        height="14px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="137px"
        left="25px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Start                :"
        {...getOverrideProps(overrides, "Start :")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="8px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="9.681818008422852px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="289px"
        height="21px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="137px"
        left="87px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={ID?.DTSTART}
        {...getOverrideProps(overrides, "Start date")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="8px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="9.681818008422852px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="244px"
        height="20px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="182px"
        left="88px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={ID?.DTEND}
        {...getOverrideProps(overrides, "End date")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="8px"
        fontWeight="700"
        color="rgba(18,17,17,1)"
        lineHeight="9.681818008422852px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="56px"
        height="11px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="181px"
        left="23px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="  End                  :"
        {...getOverrideProps(overrides, "End :")}
      ></Text>
    </View>
  );
}
