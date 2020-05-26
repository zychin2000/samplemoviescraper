import {View} from "react-native";
import * as React from "react";
import Text from "react-native-web/src/exports/Text";


export default function DetailScreen({route,navigation}) {
    const { itemId } = route.params;
    return (
        <Text>itemId: {JSON.stringify(itemId)}</Text>
    );
}
