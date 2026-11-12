import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Navigate to dashboard or handle authentication
    router.replace('/(dashboard)');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="px-6 py-8"
        >
          {/* Top Brand Header */}
          <View className="mt-4">
            <View className="w-12 h-12 rounded-2xl bg-indigo-600 items-center justify-center mb-6 shadow-sm shadow-indigo-300">
              <Text className="text-white text-xl font-black">A</Text>
            </View>

            <Text className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </Text>
            <Text className="text-base text-slate-500 mt-2 font-normal">
              Enter your credentials to access your account.
            </Text>
          </View>

          {/* Form Fields */}
          <View className="my-8 gap-y-4">
            {/* Email Input */}
            <View>
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Email address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@company.com"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                keyboardType="email-address"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-base focus:border-indigo-600"
              />
            </View>

            {/* Password Input */}
            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-semibold text-slate-700">
                  Password
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-xs font-semibold text-indigo-600">
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="relative justify-center">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-16 py-3.5 text-slate-900 text-base focus:border-indigo-600"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 py-1"
                  activeOpacity={0.7}
                >
                  <Text className="text-xs font-medium text-slate-500">
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me */}
            <Pressable
              onPress={() => setRememberMe(!rememberMe)}
              className="flex-row items-center mt-1"
            >
              <View
                className={`w-5 h-5 rounded-md border items-center justify-center mr-2.5 ${
                  rememberMe
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'bg-white border-slate-300'
                }`}
              >
                {rememberMe && (
                  <Text className="text-white text-xs font-bold leading-none">
                    ✓
                  </Text>
                )}
              </View>
              <Text className="text-sm text-slate-600 select-none">
                Remember me for 30 days
              </Text>
            </Pressable>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.85}
              className="w-full bg-indigo-600 py-3.5 rounded-xl items-center justify-center mt-3 shadow-md shadow-indigo-200 active:bg-indigo-700"
            >
              <Text className="text-white text-base font-semibold">
                Sign in
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-slate-200" />
              <Text className="mx-3 text-xs uppercase tracking-wider text-slate-400 font-medium">
                Or continue with
              </Text>
              <View className="flex-1 h-px bg-slate-200" />
            </View>

            {/* Social Logins */}
            <View className="flex-row gap-x-3">
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 flex-row items-center justify-center border border-slate-200 bg-white py-3 rounded-xl"
              >
                <Text className="text-slate-800 text-sm font-semibold">
                  Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 flex-row items-center justify-center border border-slate-200 bg-white py-3 rounded-xl"
              >
                <Text className="text-slate-800 text-sm font-semibold">
                  Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Switcher */}
          <View className="flex-row justify-center items-center pt-2">
            <Text className="text-sm text-slate-500">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/register')}
              activeOpacity={0.7}
            >
              <Text className="text-sm font-semibold text-indigo-600">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
