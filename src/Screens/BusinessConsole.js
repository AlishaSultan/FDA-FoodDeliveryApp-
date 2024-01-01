import React from 'react';
import {View , Text , StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';



export default function BusinessConsole() {
    return(
        <View style = {styles.container}>
            <Text>Business Console</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,

        alignItems:"center",

        justifyContent:'center'

    }
})