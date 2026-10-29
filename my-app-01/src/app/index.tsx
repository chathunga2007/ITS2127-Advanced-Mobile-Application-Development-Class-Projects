import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import "./global.css"

const Index = () => {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.myText}>Hello AMD</Text>
        
        <TextInput 
          placeholder="Type here..." 
          style={styles.input} 
        />
        
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "#fff" }}>Click Me</Text>
        </TouchableOpacity>

        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
          }}
          style={styles.image}
        />
        
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
          }}
          style={styles.image}
        />

        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
          }}
          style={styles.image}
        />

        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
          }}
          style={styles.image}
        />

        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
          }}
          style={styles.image}
        />

        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
          }}
          style={styles.image}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  myText: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default Index;

// import {View,Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native'

// const index = () =>{
//   return (
//     // <View style={{ backgroundColor:"red", flex:1 }}>
//     <View style={styles.container}>
//       {/* <Text>Hello AMD</Text> */}
//       <ScrollView style={{width: "100%"}}>
//       <Text style={styles.myText}>Hello AMD</Text>
//       <TextInput />
//       <TouchableOpacity>
//         <Text>Click Me</Text>
//       </TouchableOpacity>
//       <Image
//         source={{
//           uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
//         }}
//         style={styles.image}
//       ></Image>
//       <Image
//         source={{
//           uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
//         }}
//         style={styles.image}
//       ></Image>
//       <Image
//         source={{
//           uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
//         }}
//         style={styles.image}
//       ></Image>
//       <Image
//         source={{
//           uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
//         }}
//         style={styles.image}
//       ></Image>
//       <Image
//         source={{
//           uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
//         }}
//         style={styles.image}
//       ></Image>
//       <Image
//         source={{
//           uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
//         }}
//         style={styles.image}
//       ></Image>
//       <Image
//         source={{
//           uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_s4SXgfYNENNDqiRcCvH6fGRX07AOUNQT0im5L0Ld7kohpkhp3mUqIY&s=10",
//         }}
//         style={styles.image}
//       ></Image>
//       </ScrollView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor:"red",
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   myText: {
//     fontSize: 20
//   },
//   image: {
//     width: 200,
//     height: 200
//   }
// })

// export default index