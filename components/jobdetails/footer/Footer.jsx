import React from 'react'
import { View, Text,TouchableOpacity,Linking,Image } from 'react-native'

import styles from './footer.style'

const Footer = ({url}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.applyBtn} onPress={()=>Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply for this Job</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer