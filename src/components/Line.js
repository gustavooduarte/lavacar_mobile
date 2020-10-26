import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Line = (props) => {
  const { label, content='-' } = props;

  return (
    <View style={styles.line}>
      <Text style={[styles.label, label.length > 10 ? styles.longLabel : null]}>{label}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
  },
  label: {
    fontWeight: 'bold',
    flex: 1
  },
  content: {
    color: '#808080',
    flex: 3
  },
  longLabel: {
    fontSize: 12
  }
})

export default Line;