import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback, 
  LayoutAnimation, 
  NativeModules} from 'react-native';

if (Platform.OS === 'android') {
  if (NativeModules.UIManager.setLayoutAnimationEnabledExperimental) {
    NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default class LongText extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isExpanded: false
    }
  }

  changeIsExpanded() { 
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded})
  }

  componentDidUpdate(prevProps, prevState){
    LayoutAnimation.spring();
  }

  render(){
    const { label="", content = '-' } = this.props;
    const { isExpanded } = this.state; 

    return (
      <View style={styles.line}>
        <Text style={styles.label}>{label}</Text>

        <TouchableWithoutFeedback onPress = {()=>this.changeIsExpanded()}>
          <View>
            <Text style={[
              styles.content,
              isExpanded ? styles.expanded : styles.collapsed
            ]}>{content}</Text>
          </View>
        </TouchableWithoutFeedback>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    paddingTop: 3,
    paddingBottom: 3,
    borderTopWidth: 0.5,
    borderTopColor: '#808080',
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold',
    flex: 1,
    paddingBottom: 3
  },
  content: {
    color: '#808080',
    flex: 3
  },
  collapsed: {
    maxHeight: 60
  },
  expanded: {
    flex: 1
  }
})
