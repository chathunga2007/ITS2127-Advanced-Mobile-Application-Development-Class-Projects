import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const RootLayout = () => {
  return (
    <SafeAreaView className='flex-1'>
      <Slot />
    </SafeAreaView>
  )
  // return <Slot />
  // return (
  //   <View className='w-full flex-1 justify-center items-center'>
  //     <Stack screenOptions={{
  //       headerShown: false,
  //       animation: "slide_from_right"
  //     }}/>
  //     <View className='bg-blue-500 w-full p-5 flex-row justify-evenly mb-5'>
  //       <Link href={"/"}>Home</Link>
  //       <Link href={"/about"}>About</Link>
  //       <Link href={"/Test/me"}>Me</Link>
  //       <Link href={"/[1234]"}>ID</Link>
  //     </View>
  //   </View>
  // )
}

export default RootLayout