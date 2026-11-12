import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

const SelectedItem = () => {
    const params = useLocalSearchParams()
    console.log(params.id)

    return (
        <View>
            <Text>SelectedItem</Text>
        </View>
    )
}

export default SelectedItem