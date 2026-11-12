import { useLoader } from "@/hooks/useLoader"
import { register } from "@/services/auth.service"
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

const RegisterScreen = () => {
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleRegister = async () => {
    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password")
      return
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }

    try {
      setErrorMessage("")
      showLoader()
      await register(email.trim(), password)
      router.replace("/(auth)/login")
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err?.message || "Failed to create account")
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
        <View className="flex-1 justify-center px-6 py-10">
          {/* Back button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center mb-6 shadow-xs"
          >
            <MaterialIcons name="arrow-back" size={20} color="#334155" />
          </TouchableOpacity>

          {/* Header Branding */}
          <View className="mb-8">
            <View className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 items-center justify-center mb-4">
              <MaterialIcons name="person-add-alt-1" size={28} color="#4f46e5" />
            </View>
            <Text className="text-3xl font-black text-slate-900 tracking-tight">
              Create Account
            </Text>
            <Text className="text-sm text-slate-500 mt-1">
              Join now to track tasks and read live headlines
            </Text>
          </View>

          {/* Card Form */}
          <View className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm shadow-slate-200">
            {errorMessage ? (
              <View className="bg-rose-50 border border-rose-200 rounded-2xl p-3 mb-4 flex-row items-center gap-x-2">
                <MaterialIcons name="error-outline" size={18} color="#e11d48" />
                <Text className="text-rose-600 text-xs font-semibold flex-1">
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            {/* Email */}
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

            {/* Password */}
            <View className="mb-4">
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
                  placeholder="Min. 6 characters"
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

            {/* Confirm Password */}
            <View className="mb-6">
              <Text className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Confirm Password
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                <MaterialIcons name="verified-user" size={20} color="#64748b" />
                <TextInput
                  value={confirmPassword}
                  onChangeText={(val) => {
                    setConfirmPassword(val)
                    if (errorMessage) setErrorMessage("")
                  }}
                  placeholder="Re-enter password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-slate-800 text-sm font-medium"
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleRegister}
              className="bg-indigo-600 rounded-2xl py-3.5 items-center justify-center shadow-md shadow-indigo-200"
            >
              <Text className="text-white text-base font-bold tracking-wide">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View className="flex-row justify-center items-center mt-8 gap-x-1">
            <Text className="text-sm text-slate-500">
              Already have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <Text className="text-sm font-bold text-indigo-600">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen