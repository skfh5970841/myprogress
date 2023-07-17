import { getDoc, doc } from "firebase/firestore/lite";
import db from "../../firebase";

export async function getTest(test) {
  const testProgress = doc(db, "testProgress", test);
  const testProgressSnapshot = await getDoc(testProgress);

  if (!testProgressSnapshot.exists()) {
    return "읎는 것 같아 보임다";
  }

  return testProgressSnapshot.data();
}
