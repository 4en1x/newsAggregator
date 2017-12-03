import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Info extends Component {
    render (){
        return (
            <View style={styles.container}>
				<Text>
					А это моё замечательное приложение
				</Text>
            </View>
        );
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});