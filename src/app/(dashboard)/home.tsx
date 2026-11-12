import { SymbolView } from 'expo-symbols';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-5 pt-3 pb-4 bg-white border-b border-slate-100 flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-3">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }}
            className="w-11 h-11 rounded-full bg-slate-200"
          />
          <View>
            <Text className="text-xs font-medium text-slate-400">Welcome back,</Text>
            <Text className="text-lg font-bold text-slate-800">Chathunga Bimsara 👋</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 items-center justify-center relative"
        >
          <SymbolView
            name={{ ios: 'bell.fill', android: 'notifications', web: 'notifications' }}
            tintColor="#334155"
            size={20}
          />
          <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Search Bar */}
        <View className="px-5 mt-5">
          <View className="flex-row items-center bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm shadow-slate-100">
            <SymbolView
              name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
              tintColor="#94a3b8"
              size={18}
            />
            <TextInput
              placeholder="Search assets, trends, analytics..."
              placeholderTextColor="#94a3b8"
              className="flex-1 ml-3 text-slate-800 text-sm font-medium"
            />
          </View>
        </View>

        {/* Featured Hero Card */}
        <View className="px-5 mt-5">
          <View className="bg-indigo-600 rounded-3xl p-6 shadow-lg shadow-indigo-300">
            <View className="flex-row items-center justify-between">
              <View className="bg-indigo-500/60 px-3 py-1 rounded-full">
                <Text className="text-indigo-100 text-xs font-semibold uppercase tracking-wider">
                  Total Portfolio
                </Text>
              </View>
              <Text className="text-emerald-300 text-xs font-bold bg-emerald-500/20 px-2.5 py-1 rounded-full">
                +14.8% this month
              </Text>
            </View>

            <View className="mt-4">
              <Text className="text-white text-3xl font-black tracking-tight">
                $48,920.50
              </Text>
              <Text className="text-indigo-200 text-xs mt-1">
                Updated just now • USD
              </Text>
            </View>

            <View className="flex-row items-center gap-x-3 mt-6 pt-4 border-t border-indigo-500/40">
              <TouchableOpacity
                activeOpacity={0.85}
                className="flex-1 bg-white py-2.5 rounded-xl items-center justify-center shadow-sm"
              >
                <Text className="text-indigo-600 font-bold text-xs tracking-wide">
                  Deposit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                className="flex-1 bg-indigo-500/80 py-2.5 rounded-xl items-center justify-center border border-indigo-400"
              >
                <Text className="text-white font-bold text-xs tracking-wide">
                  Withdraw
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Action Grid */}
        <View className="px-5 mt-6">
          <Text className="text-slate-800 font-bold text-base mb-3">Quick Actions</Text>
          <View className="flex-row justify-between">
            {[
              { title: 'Transfer', icon: 'arrow.left.arrow.right' as const, bg: 'bg-blue-50', text: 'text-blue-600' },
              { title: 'Analytics', icon: 'chart.pie.fill' as const, bg: 'bg-emerald-50', text: 'text-emerald-600' },
              { title: 'Cards', icon: 'creditcard.fill' as const, bg: 'bg-amber-50', text: 'text-amber-600' },
              { title: 'More', icon: 'ellipsis' as const, bg: 'bg-purple-50', text: 'text-purple-600' },
            ].map((action, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                className="items-center w-20"
              >
                <View className={`w-14 h-14 rounded-2xl ${action.bg} items-center justify-center mb-1.5 shadow-sm shadow-slate-100`}>
                  <SymbolView
                    name={{ ios: action.icon, android: 'star', web: 'star' }}
                    tintColor={action.text.includes('blue') ? '#2563eb' : action.text.includes('emerald') ? '#059669' : action.text.includes('amber') ? '#d97706' : '#9333ea'}
                    size={22}
                  />
                </View>
                <Text className="text-slate-600 text-xs font-semibold">{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Live Market Trends */}
        <View className="mt-7">
          <View className="px-5 flex-row items-center justify-between mb-3">
            <Text className="text-slate-800 font-bold text-base">Top Performance</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-indigo-600 text-xs font-bold">See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          >
            {[
              { name: 'Apple Inc.', ticker: 'AAPL', price: '$224.23', change: '+2.4%', color: 'text-emerald-600' },
              { name: 'Nvidia Corp.', ticker: 'NVDA', price: '$135.58', change: '+5.7%', color: 'text-emerald-600' },
              { name: 'Tesla Motors', ticker: 'TSLA', price: '$218.89', change: '-1.1%', color: 'text-rose-500' },
            ].map((stock, idx) => (
              <View
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 w-44 shadow-sm shadow-slate-100"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-xs font-bold text-slate-400">{stock.ticker}</Text>
                  <Text className={`text-xs font-bold ${stock.color}`}>{stock.change}</Text>
                </View>
                <Text className="text-slate-800 font-bold text-sm mt-3" numberOfLines={1}>
                  {stock.name}
                </Text>
                <Text className="text-slate-900 font-extrabold text-lg mt-1">
                  {stock.price}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View className="px-5 mt-7">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-slate-800 font-bold text-base">Recent Transactions</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-indigo-600 text-xs font-bold">View history</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden divide-y divide-slate-100 shadow-sm shadow-slate-100">
            {[
              { title: 'Figma Subscription', category: 'Software & Tools', time: 'Today, 2:45 PM', amount: '-$15.00', isDebit: true },
              { title: 'Dividend Payout', category: 'Apple Inc.', time: 'Yesterday', amount: '+$142.80', isDebit: false },
              { title: 'Stripe Payout', category: 'Client Project', time: 'Nov 02', amount: '+$2,400.00', isDebit: false },
            ].map((tx, idx) => (
              <View key={idx} className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center gap-x-3.5">
                  <View className={`w-10 h-10 rounded-xl items-center justify-center ${tx.isDebit ? 'bg-slate-100' : 'bg-emerald-50'}`}>
                    <SymbolView
                      name={{ ios: tx.isDebit ? 'arrow.up.right' : 'arrow.down.left', android: 'payments', web: 'payments' }}
                      tintColor={tx.isDebit ? '#475569' : '#059669'}
                      size={18}
                    />
                  </View>
                  <View>
                    <Text className="text-slate-800 font-semibold text-sm">{tx.title}</Text>
                    <Text className="text-slate-400 text-xs mt-0.5">{tx.category} • {tx.time}</Text>
                  </View>
                </View>
                <Text className={`font-bold text-sm ${tx.isDebit ? 'text-slate-800' : 'text-emerald-600'}`}>
                  {tx.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
