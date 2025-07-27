import { COLORS } from '@/constants/Colors'
import { Image, StyleSheet, View } from 'react-native'

export default function LoadingInit() {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('@/assets/images/adaptive-icon.png')}
        style={styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logo: {
    height: '20%',
    aspectRatio: 1,
  },
})
