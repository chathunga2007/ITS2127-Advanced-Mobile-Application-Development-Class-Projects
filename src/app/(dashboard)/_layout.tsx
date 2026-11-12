import MaterialIcons from "@react-native-vector-icons/material-icons"
import { Tabs } from "expo-router"

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#f1f5f9",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialIcons
                name={focused ? "home" : "home-filled"}
                size={size}
                color={color}
              />
            )
          },
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialIcons
                name={focused ? "list" : "list-alt"}
                size={size}
                color={color}
              />
            )
          },
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialIcons
                name={focused ? "article" : "list-alt"}
                size={size}
                color={color}
              />
            )
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialIcons
                name={focused ? "settings" : "settings-applications"}
                size={size}
                color={color}
              />
            )
          },
        }}
      />
    </Tabs>
  )
}

export default DashboardLayout