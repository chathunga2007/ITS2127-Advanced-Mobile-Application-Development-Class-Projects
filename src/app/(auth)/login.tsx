import { useLoader } from "@/hooks/useLoader"
import { login } from "@/services/auth.service"
import MaterialIcons from "@react-native-vector-icons/material-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

const LoginScreen = () => {
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password")
      return
    }

    try {
      setErrorMessage("")
      showLoader()
      await login(email.trim(), password)
      router.replace("/home")
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err?.message || "Invalid email or password")
    } finally {
      hideLoader()
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-slate-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Brand Badge */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 rounded-3xl bg-indigo-600 items-center justify-center mb-4 shadow-lg shadow-indigo-200">
              <MaterialIcons name="bolt" size={34} color="#ffffff" />
            </View>
            <Text className="text-3xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </Text>
            <Text className="text-sm text-slate-500 mt-1">
              Sign in to manage your daily tasks & news
            </Text>
          </View>

          {/* Form Card */}
          <View className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm shadow-slate-200">
            {errorMessage ? (
              <View className="bg-rose-50 border border-rose-200 rounded-2xl p-3 mb-4 flex-row items-center gap-x-2">
                <MaterialIcons name="error-outline" size={18} color="#e11d48" />
                <Text className="text-rose-600 text-xs font-semibold flex-1">
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            {/* Email Field */}
            <View className="mb-4">
              <Text className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Email Address
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                <MaterialIcons name="mail-outline" size={20} color="#64748b" />
                <TextInput
                  value={email}
                  onChangeText={(val) => {
                    setEmail(val)
                    if (errorMessage) setErrorMessage("")
                  }}
                  placeholder="name@example.com"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="flex-1 ml-3 text-slate-800 text-sm font-medium"
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="mb-6">
              <Text className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Password
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                <MaterialIcons name="lock-outline" size={20} color="#64748b" />
                <TextInput
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val)
                    if (errorMessage) setErrorMessage("")
                  }}
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-slate-800 text-sm font-medium"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#64748b"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleLogin}
              className="bg-indigo-600 rounded-2xl py-3.5 items-center justify-center shadow-md shadow-indigo-200"
            >
              <Text className="text-white text-base font-bold tracking-wide">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View className="flex-row justify-center items-center mt-8 gap-x-1">
            <Text className="text-sm text-slate-500">
              Don&apos;t have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/register")}
            >
              <Text className="text-sm font-bold text-indigo-600">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen