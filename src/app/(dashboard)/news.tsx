import { fetchNews } from "@/services/news.service"
import MaterialIcons from "@react-native-vector-icons/material-icons"
import { useFocusEffect } from "expo-router"
import { useCallback, useRef, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const NewsScreen = () => {
  const [newsData, setNewsData] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasLoadedRef = useRef(false)

  const loadNews = useCallback(async (isPull = false) => {
    try {
      setError(null)
      const res = await fetchNews()
      const valid = (res?.articles || []).filter(
        (a: any) => a.title && a.title !== "[Removed]"
      )
      setNewsData(valid)
      hasLoadedRef.current = true
    } catch (err: any) {
      console.error(err)
      if (!isPull) setNewsData([])
      setError(err?.message || "Failed to load news")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (!hasLoadedRef.current) {
        loadNews()
      }
    }, [loadNews])
  )

  const onRefresh = () => {
    setRefreshing(true)
    loadNews(true)
  }

  const handleOpenUrl = (url: string) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("URL error:", err))
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header matching Home & Profile */}
      <View className="px-5 pt-3 pb-4 bg-white border-b border-slate-100 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-black text-slate-900 tracking-tight">
            Market Pulse
          </Text>
          <Text className="text-xs text-slate-400 font-medium">
            Top headlines & verified reports
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onRefresh}
          className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 items-center justify-center"
        >
          <MaterialIcons name="refresh" size={20} color="#334155" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text className="text-xs text-slate-500 font-semibold mt-3">
            Loading latest headlines...
          </Text>
        </View>
      ) : error && newsData.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-white border border-slate-200/80 p-6 rounded-3xl items-center w-full max-w-sm shadow-sm shadow-slate-100">
            <View className="w-12 h-12 rounded-2xl bg-rose-50 items-center justify-center mb-3">
              <MaterialIcons name="wifi-off" size={24} color="#e11d48" />
            </View>
            <Text className="text-slate-900 font-bold text-base">
              Couldn&apos;t load news
            </Text>
            <Text className="text-slate-500 text-xs mt-1 text-center">
              {error}
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setLoading(true)
                loadNews()
              }}
              className="mt-4 bg-indigo-600 px-5 py-2.5 rounded-2xl"
            >
              <Text className="text-white text-xs font-bold">Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={(item, index) => item.url || String(index)}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4f46e5"
              colors={["#4f46e5"]}
            />
          }
          renderItem={({ item }: any) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => handleOpenUrl(item.url)}
              className="bg-white border border-slate-200/80 rounded-3xl mb-4 overflow-hidden shadow-sm shadow-slate-100"
            >
              {item.urlToImage ? (
                <View className="relative">
                  <Image
                    source={{ uri: item.urlToImage }}
                    className="h-44 w-full bg-slate-100"
                    resizeMode="cover"
                  />
                  <View className="absolute bottom-2.5 left-3 bg-white/95 px-2.5 py-1 rounded-full border border-slate-200/80">
                    <Text className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      {item.source?.name || "News"}
                    </Text>
                  </View>
                </View>
              ) : null}

              <View className="p-4">
                <View className="flex-row items-center justify-between mb-1.5">
                  {!item.urlToImage ? (
                    <Text className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      {item.source?.name || "News"}
                    </Text>
                  ) : (
                    <View />
                  )}
                  <Text className="text-[11px] text-slate-400 font-medium">
                    {formatDate(item.publishedAt)}
                  </Text>
                </View>

                <Text
                  className="text-base font-bold text-slate-900 leading-snug mb-1.5"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>

                {item.description ? (
                  <Text
                    className="text-xs text-slate-500 leading-relaxed mb-3"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                ) : null}

                <View className="flex-row items-center justify-between pt-2.5 border-t border-slate-100">
                  <Text
                    className="text-[11px] text-slate-400 font-medium max-w-[70%]"
                    numberOfLines={1}
                  >
                    {item.author ? `By ${item.author}` : "Top Headline"}
                  </Text>
                  <View className="flex-row items-center gap-x-1">
                    <Text className="text-xs font-bold text-indigo-600">
                      Read Story
                    </Text>
                    <MaterialIcons
                      name="arrow-outward"
                      size={14}
                      color="#4f46e5"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="py-24 items-center justify-center">
              <MaterialIcons name="newspaper" size={44} color="#94a3b8" />
              <Text className="text-slate-600 font-semibold mt-3 text-sm">
                No headlines found
              </Text>
              <Text className="text-slate-400 text-xs mt-1">
                Pull down to check for breaking news
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

export default NewsScreen