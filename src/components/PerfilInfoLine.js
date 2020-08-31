import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const PerfilInfoLine = (props) => {
    const { label, content = '- - - - - -' } = props;

    return (
        <View>
            <TouchableOpacity onPress={() => { alert(' Parte em Manutenção ') }}>
                <View style={styles.line}>
                    <Text style={[styles.cell, styles.label]}>{label}</Text>
                    <Text style={[styles.cell, styles.content]}>{content}</Text>
                    <Icon name={'chevron-right'} size={20} style={styles.icon} />
                </View>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderColor: '#C5C5C5',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 17,
        flex: 1
    },
    content: {
        flex: 3,
        color: "#808080"
    },
})

export default PerfilInfoLine;