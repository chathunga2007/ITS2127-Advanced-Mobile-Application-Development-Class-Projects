import { Stack } from 'expo-router'

const AuthLayout = () => {
  return <Stack screenOptions={{
    headerShown: false,
    animation: "slide_from_right"
  }}>
    <Stack.Screen name='login'/>
    <Stack.Screen name='register'/>
  </Stack>
}

export default AuthLayout