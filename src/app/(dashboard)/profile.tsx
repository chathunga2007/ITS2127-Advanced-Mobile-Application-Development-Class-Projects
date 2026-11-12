import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

const ProfileScreen = () => {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [biometrics, setBiometrics] = React.useState(false);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Top Bar */}
      <View className="px-5 pt-3 pb-3 bg-white border-b border-slate-100 flex-row items-center justify-between">
        <Text className="text-2xl font-black text-slate-900 tracking-tight">Account</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 items-center justify-center"
        >
          <SymbolView
            name={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }}
            tintColor="#334155"
            size={18}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1"
      >
        {/* User Card */}
        <View className="px-5 mt-5">
          <View className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm shadow-slate-100 items-center">
            <View className="relative">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' }}
                className="w-20 h-20 rounded-full bg-slate-100"
              />
              <View className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-indigo-600 border-2 border-white items-center justify-center">
                <SymbolView
                  name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                  tintColor="#ffffff"
                  size={12}
                />
              </View>
            </View>

            <Text className="text-slate-900 font-extrabold text-lg mt-3">Sarah Jenkins</Text>
            <Text className="text-slate-400 text-xs font-medium">sarah.jenkins@company.com</Text>

            <View className="flex-row items-center gap-x-2 mt-3 bg-indigo-50 px-3 py-1 rounded-full">
              <Text className="text-indigo-600 text-xs font-bold uppercase tracking-wide">
                PRO Member
              </Text>
            </View>

            {/* Quick Metrics */}
            <View className="flex-row w-full justify-around pt-5 mt-5 border-t border-slate-100">
              <View className="items-center">
                <Text className="text-slate-900 font-extrabold text-base">28</Text>
                <Text className="text-slate-400 text-xs">Transactions</Text>
              </View>
              <View className="w-px h-8 bg-slate-200 self-center" />
              <View className="items-center">
                <Text className="text-slate-900 font-extrabold text-base">4</Text>
                <Text className="text-slate-400 text-xs">Wallets</Text>
              </View>
              <View className="w-px h-8 bg-slate-200 self-center" />
              <View className="items-center">
                <Text className="text-slate-900 font-extrabold text-base">Tier 2</Text>
                <Text className="text-slate-400 text-xs">KYC Status</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Security & Preferences */}
        <View className="px-5 mt-6">
          <Text className="text-slate-800 font-bold text-base mb-3">Preferences & Security</Text>
          <View className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden divide-y divide-slate-100 shadow-sm shadow-slate-100">
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-x-3">
                <View className="w-9 h-9 rounded-xl bg-indigo-50 items-center justify-center">
                  <SymbolView
                    name={{ ios: 'bell.fill', android: 'notifications', web: 'notifications' }}
                    tintColor="#4f46e5"
                    size={16}
                  />
                </View>
                <Text className="text-slate-700 font-semibold text-sm">Push Notifications</Text>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#e2e8f0', true: '#4f46e5' }}
              />
            </View>

            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-x-3">
                <View className="w-9 h-9 rounded-xl bg-purple-50 items-center justify-center">
                  <SymbolView
                    name={{ ios: 'faceid', android: 'fingerprint', web: 'fingerprint' }}
                    tintColor="#9333ea"
                    size={16}
                  />
                </View>
                <Text className="text-slate-700 font-semibold text-sm">FaceID / Biometrics</Text>
              </View>
              <Switch
                value={biometrics}
                onValueChange={setBiometrics}
                trackColor={{ false: '#e2e8f0', true: '#4f46e5' }}
              />
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-5 mt-6">
          <Text className="text-slate-800 font-bold text-base mb-3">General</Text>
          <View className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden divide-y divide-slate-100 shadow-sm shadow-slate-100">
            {[
              { label: 'Personal Information', icon: 'person.crop.circle' as const, tint: '#2563eb', bg: 'bg-blue-50' },
              { label: 'Payment Methods & Cards', icon: 'creditcard' as const, tint: '#059669', bg: 'bg-emerald-50' },
              { label: 'Help & Customer Support', icon: 'questionmark.circle' as const, tint: '#d97706', bg: 'bg-amber-50' },
              { label: 'Privacy Policy', icon: 'lock.shield' as const, tint: '#475569', bg: 'bg-slate-100' },
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                className="flex-row items-center justify-between p-4"
              >
                <View className="flex-row items-center gap-x-3">
                  <View className={`w-9 h-9 rounded-xl ${item.bg} items-center justify-center`}>
                    <SymbolView
                      name={{ ios: item.icon, android: 'star', web: 'star' }}
                      tintColor={item.tint}
                      size={16}
                    />
                  </View>
                  <Text className="text-slate-700 font-semibold text-sm">{item.label}</Text>
                </View>
                <SymbolView
                  name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                  tintColor="#cbd5e1"
                  size={14}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Action */}
        <View className="px-5 mt-8">
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/login')}
            activeOpacity={0.85}
            className="w-full bg-rose-50 border border-rose-200/80 py-3.5 rounded-2xl items-center justify-center flex-row gap-x-2"
          >
            <SymbolView
              name={{ ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' }}
              tintColor="#e11d48"
              size={16}
            />
            <Text className="text-rose-600 font-bold text-sm">Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
