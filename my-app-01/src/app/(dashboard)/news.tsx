// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   RefreshControl,
//   Linking,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { SymbolView } from 'expo-symbols';
// import { getTopHeadlines, Article } from '@/services/newsService';

// const CATEGORIES = ['All', 'Markets', 'Tech', 'Economy', 'Startups'];

// const NewsScreen = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchNews = useCallback(async () => {
//     try {
//       setError(null);
//       const data = await getTopHeadlines('us');
//       // Filter out removed or empty articles if any
//       const validArticles = data.filter(
//         (art) => art.title && art.title !== '[Removed]'
//       );
//       setArticles(validArticles);
//     } catch (err: any) {
//       setError(err?.message || 'Failed to load news headlines.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchNews();
//   }, [fetchNews]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchNews();
//   };

//   const handleArticlePress = (url: string) => {
//     if (url) {
//       Linking.openURL(url).catch((err) =>
//         console.error('Failed to open url:', err)
//       );
//     }
//   };

//   const featuredArticle = articles.length > 0 ? articles[0] : null;
//   const listArticles = articles.length > 1 ? articles.slice(1) : [];

//   const formatDate = (dateStr: string) => {
//     if (!dateStr) return '';
//     const date = new Date(dateStr);
//     const now = new Date();
//     const diffHours = Math.floor(
//       (now.getTime() - date.getTime()) / (1000 * 60 * 60)
//     );
//     if (diffHours < 1) return 'Just now';
//     if (diffHours === 1) return '1h ago';
//     if (diffHours < 24) return `${diffHours}h ago`;
//     const diffDays = Math.floor(diffHours / 24);
//     return `${diffDays}d ago`;
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-slate-50">
//       {/* Top Header */}
//       <View className="px-5 pt-3 pb-3 bg-white border-b border-slate-100 flex-row items-center justify-between">
//         <View>
//           <Text className="text-2xl font-black text-slate-900 tracking-tight">Market Pulse</Text>
//           <Text className="text-xs text-slate-400 font-medium">Curated insights & verified reports</Text>
//         </View>

//         <TouchableOpacity
//           activeOpacity={0.7}
//           className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 items-center justify-center"
//         >
//           <SymbolView
//             name={{ ios: 'bookmark.fill', android: 'bookmark', web: 'bookmark' }}
//             tintColor="#334155"
//             size={18}
//           />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         className="flex-1"
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {/* Category Filter Chips */}
//         <View className="py-4 bg-white border-b border-slate-100">
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
//           >
//             {CATEGORIES.map((cat) => {
//               const active = selectedCategory === cat;
//               return (
//                 <TouchableOpacity
//                   key={cat}
//                   onPress={() => setSelectedCategory(cat)}
//                   activeOpacity={0.75}
//                   className={`px-4 py-2 rounded-xl ${
//                     active ? 'bg-indigo-600' : 'bg-slate-100'
//                   }`}
//                 >
//                   <Text
//                     className={`text-xs font-bold ${
//                       active ? 'text-white' : 'text-slate-600'
//                     }`}
//                   >
//                     {cat}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>

//         {/* Loading State */}
//         {loading && (
//           <View className="py-20 items-center justify-center">
//             <ActivityIndicator size="large" color="#4f46e5" />
//             <Text className="text-sm font-medium text-slate-500 mt-3">Loading headlines...</Text>
//           </View>
//         )}

//         {/* Error State */}
//         {!loading && error && (
//           <View className="p-6 m-5 bg-rose-50 border border-rose-200 rounded-2xl items-center">
//             <Text className="text-rose-600 font-bold text-sm text-center">{error}</Text>
//             <TouchableOpacity
//               onPress={fetchNews}
//               activeOpacity={0.8}
//               className="mt-3 bg-rose-600 px-4 py-2 rounded-xl"
//             >
//               <Text className="text-white text-xs font-bold">Try Again</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Breaking / Featured Story */}
//         {!loading && !error && featuredArticle && (
//           <View className="px-5 mt-5">
//             <TouchableOpacity
//               activeOpacity={0.9}
//               onPress={() => handleArticlePress(featuredArticle.url)}
//               className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md shadow-slate-100"
//             >
//               <View className="relative">
//                 <Image
//                   source={{
//                     uri:
//                       featuredArticle.urlToImage ||
//                       'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80',
//                   }}
//                   className="w-full h-48 bg-slate-200"
//                 />
//                 <View className="absolute top-3 left-3 bg-rose-600 px-3 py-1 rounded-full">
//                   <Text className="text-white text-[10px] font-extrabold uppercase tracking-widest">
//                     Breaking
//                   </Text>
//                 </View>
//               </View>

//               <View className="p-5">
//                 <View className="flex-row items-center gap-x-2 mb-2">
//                   <Text className="text-xs font-bold text-indigo-600 uppercase">
//                     {featuredArticle.source?.name || 'Top News'}
//                   </Text>
//                   <Text className="text-slate-300">•</Text>
//                   <Text className="text-xs text-slate-400">
//                     {formatDate(featuredArticle.publishedAt)}
//                   </Text>
//                 </View>

//                 <Text className="text-slate-900 font-extrabold text-lg leading-6" numberOfLines={3}>
//                   {featuredArticle.title}
//                 </Text>

//                 {featuredArticle.description && (
//                   <Text className="text-slate-600 text-xs mt-2 leading-relaxed" numberOfLines={2}>
//                     {featuredArticle.description}
//                   </Text>
//                 )}

//                 <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-slate-100">
//                   <Text className="text-xs text-slate-400">Tap to read full story</Text>
//                   <SymbolView
//                     name={{ ios: 'arrow.up.right', android: 'arrow_outward', web: 'arrow_outward' }}
//                     tintColor="#4f46e5"
//                     size={16}
//                   />
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* News Feed List */}
//         {!loading && !error && listArticles.length > 0 && (
//           <View className="px-5 mt-6 mb-8 gap-y-4">
//             <Text className="text-slate-800 font-bold text-base">Latest Stories</Text>

//             {listArticles.map((item, index) => (
//               <TouchableOpacity
//                 key={`${item.url}-${index}`}
//                 activeOpacity={0.8}
//                 onPress={() => handleArticlePress(item.url)}
//                 className="bg-white p-4 rounded-2xl border border-slate-200/80 flex-row gap-x-4 shadow-sm shadow-slate-100"
//               >
//                 <Image
//                   source={{
//                     uri:
//                       item.urlToImage ||
//                       'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80',
//                   }}
//                   className="w-24 h-24 rounded-xl bg-slate-100"
//                 />
//                 <View className="flex-1 justify-between py-0.5">
//                   <View>
//                     <View className="flex-row items-center gap-x-2 mb-1">
//                       <Text
//                         className="text-[10px] font-bold text-indigo-600 uppercase"
//                         numberOfLines={1}
//                       >
//                         {item.source?.name || 'News'}
//                       </Text>
//                     </View>
//                     <Text
//                       className="text-slate-800 font-bold text-sm leading-snug"
//                       numberOfLines={2}
//                     >
//                       {item.title}
//                     </Text>
//                   </View>

//                   <View className="flex-row items-center justify-between pt-2">
//                     <Text className="text-[11px] text-slate-400">
//                       {formatDate(item.publishedAt)}
//                     </Text>
//                     {item.author && (
//                       <Text
//                         className="text-[11px] text-slate-400 font-medium max-w-[120px]"
//                         numberOfLines={1}
//                       >
//                         {item.author}
//                       </Text>
//                     )}
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default NewsScreen;


import { fetchNews } from "@/services/newsService"
import { useEffect, useState } from "react"
import { FlatList, Image, Linking, Text, TouchableOpacity, View } from "react-native"

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([])

  const fetchNewsData = async () => {
    try {
      const res = await fetchNews()
      setNewsData(res.articles)
      console.log(res.articles)
    } catch(err) {
      console.error(err)
      setNewsData([])
    }
  }

  useEffect(() => {
    fetchNewsData()
  }, [])

  const handleOpenArticle = (url: string) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Couldn't open URL", err))
    }
  }

  return (
    <View className="flex-1 w-full bg-slate-50">
      <Text className="text-xl font-bold px-4 pt-4 pb-2 text-slate-800">News Feed</Text>
      <FlatList
        data={newsData}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={(news: any) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOpenArticle(news.item.url)}
            className="bg-white mx-4 my-2 p-4 rounded-xl border border-slate-200 shadow-sm"
          >
            {news.item.urlToImage ? (
              <Image
                source={{ uri: news.item.urlToImage }}
                className="w-full h-44 rounded-lg mb-3 bg-slate-100"
                resizeMode="cover"
              />
            ) : null}

            <Text className="text-xs font-semibold text-indigo-600 mb-1">
              {news.item.source?.name || "News"}
            </Text>

            <Text className="text-base font-bold text-slate-900 mb-1">
              {news.item.title}
            </Text>

            {news.item.description ? (
              <Text className="text-xs text-slate-600 mb-2" numberOfLines={2}>
                {news.item.description}
              </Text>
            ) : null}

            <Text className="text-[11px] text-indigo-500 font-semibold self-end">
              Read more →
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default NewsScreen