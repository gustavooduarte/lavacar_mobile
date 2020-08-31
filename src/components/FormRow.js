import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const FormRow = (props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
  }
});

export default FormRow;