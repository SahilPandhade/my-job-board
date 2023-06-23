import React from 'react'
import { View, Text } from 'react-native'

import styles from './screenheader.style'
import { TouchableOpacity,Image } from 'react-native'

const ScreenHeaderBtn = ({iconsUrl, dimensions, handlePress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
        <Image
            source={iconsUrl}
            resizeMode='cover'
            style={styles.btnImg(dimensions)}
        />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn