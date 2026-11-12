import { Stack } from "expo-router"

const TaskLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="form" />
    </Stack>
  )
}

export default TaskLayout