import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";

const getCurrentUser = (): Promise<User | null> => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser);
  }
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const addTask = async (
  title: string,
  description: string,
  isComplete: boolean = false
) => {
  const user = await getCurrentUser();
  if (!user) {
    throw Error("User not logged in. Please sign in first.");
  }

  await addDoc(collection(db, "tasks"), {
    title,
    description,
    isComplete,
    createdAt: new Date().toISOString(),
    userId: user.uid,
  });
};

export const getMyTask = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw Error("User not logged in. Please sign in first.");
  }

  const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);
  const items = snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: (data.title as string) || "",
      description: (data.description as string) || "",
      isComplete: (data.isComplete as boolean) || false,
      createdAt: (data.createdAt as string) || "",
      userId: data.userId,
    };
  });
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};