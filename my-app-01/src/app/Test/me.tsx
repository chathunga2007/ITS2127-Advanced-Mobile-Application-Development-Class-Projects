import { View, Text } from 'react-native'
import React from 'react'

const Me = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <View className="bg-white p-6 rounded-2xl shadow-md items-center">
        <Text className="text-2xl font-bold text-blue-600 mb-2">Hello Me!</Text>
      </View>
    </View>
  )
}

export default Me