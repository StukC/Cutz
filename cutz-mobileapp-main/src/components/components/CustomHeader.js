import { View } from "react-native";
import React from "react";
import { Spacer } from "./Spacer";

const CustomHeader = ({ LeftSide, Center, RightSide ,borderBottomWidth,borderBottomColor,paddingBottom}) => {
  return (
    <View
      style={{
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        // ...commonStyles.rowContainer,
        justifyContent: "space-between",
        borderBottomWidth:borderBottomWidth,
        borderBottomColor:borderBottomColor,
        paddingBottom:paddingBottom
        
        
      }}
    >
      {LeftSide ? <LeftSide /> : <Spacer width={20}/>}
      {Center ? <Center /> : <Spacer width={20}/>}
      {RightSide ? <RightSide /> : <Spacer width={20}/>}
    </View>
  );
};

export default CustomHeader;

// const Row = styled(View, {
//   ...commonStyles.rowContainer,
//   justifyContent: "space-between",
// });
