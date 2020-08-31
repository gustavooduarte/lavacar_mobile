import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ItemRow = (props) => {
    const { label, content } = props;

    return (
        <View>
            <Text style={styles.itemlabel}>{label}</Text>
            <Text style={styles.itemcontent}>{content}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    itemlabel: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },

    itemcontent: {
        marginTop: 8,
        fontSize: 19,
        marginBottom: 24,
        color: '#808080',
    },
});

export default ItemRow;