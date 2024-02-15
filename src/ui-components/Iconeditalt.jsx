/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { generateClient } from "aws-amplify/api";
import { updateSchedule } from "../graphql/mutations";
import { getOverrideProps } from "./utils";
import { Icon } from "@aws-amplify/ui-react";
const client = generateClient();
export default function Iconeditalt(props) {
  const { schedule, overrides, ...rest } = props;
  const iconeditaltOnClick = async () => {
    await client.graphql({
      query: updateSchedule.replaceAll("__typename", ""),
      variables: {
        input: {
          SUMMARY: "String",
          DTSTART: "Date/Time",
          DTEND: "Date/Time",
          userinfoID: "String",
          isTask: "Is it a task",
          DESCRIPTION: "String",
          LOCATION: "String",
          id: schedule?.id,
        },
      },
    });
  };
  return (
    <Icon
      width="15.29px"
      height="15.79px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      viewBox={{ minX: 0, minY: 0, width: 15, height: 15 }}
      paths={[
        {
          d: "M11.2927 0.256853C11.452 0.0923901 11.668 0 11.8933 0C12.1186 0 12.3346 0.0923901 12.4939 0.256853L15.0425 2.88867C15.2017 3.05318 15.2912 3.27628 15.2912 3.5089C15.2912 3.74152 15.2017 3.96462 15.0425 4.12913L7.39678 12.0246C7.2375 12.1891 7.02145 12.2816 6.79616 12.2816L4.2476 12.2816C4.0223 12.2816 3.80622 12.1892 3.6469 12.0247C3.48759 11.8601 3.39808 11.637 3.39808 11.4043L3.39808 8.77253C3.39813 8.53988 3.48766 8.31678 3.64699 8.1523L11.2927 0.256853ZM5.09712 9.13572L5.09712 10.5271L6.44446 10.5271L13.2406 3.5089L11.8933 2.11755L5.09712 9.13572ZM0 3.5089C0 3.04356 0.179006 2.59729 0.497638 2.26825C0.81627 1.93921 1.24843 1.75436 1.69904 1.75436L5.94664 1.75436C6.17195 1.75436 6.38803 1.84678 6.54735 2.0113C6.70666 2.17582 6.79616 2.39896 6.79616 2.63163C6.79616 2.86429 6.70666 3.08743 6.54735 3.25195C6.38803 3.41647 6.17195 3.5089 5.94664 3.5089L1.69904 3.5089L1.69904 14.0362L11.8933 14.0362L11.8933 9.6498C11.8933 9.41713 11.9828 9.19399 12.1421 9.02947C12.3014 8.86495 12.5175 8.77253 12.7428 8.77253C12.9681 8.77253 13.1842 8.86495 13.3435 9.02947C13.5028 9.19399 13.5923 9.41713 13.5923 9.6498L13.5923 14.0362C13.5923 14.5015 13.4133 14.9478 13.0947 15.2768C12.7761 15.6058 12.3439 15.7907 11.8933 15.7907L1.69904 15.7907C1.24843 15.7907 0.81627 15.6058 0.497638 15.2768C0.179006 14.9478 3.77263e-16 14.5015 0 14.0362L0 3.5089Z",
          fill: "rgba(34,17,230,1)",
          fillRule: "nonzero",
          style: { transform: "translate(0%, 0%)" },
        },
      ]}
      onClick={() => {
        iconeditaltOnClick();
      }}
      {...getOverrideProps(overrides, "Iconeditalt")}
      {...rest}
    ></Icon>
  );
}
