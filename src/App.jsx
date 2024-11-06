import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { app } from "./assets/firebase";
import './App.css'

const firestore = getFirestore(app);

function App() {
  const writeData = async () => {
    const result = await addDoc(collection(firestore, "cities"), {
      name: "Karachi",
      pinCode: 12345,
      lat: 6789,
      long: 4567,
    });
    console.log("Result", result);

  }

  const makeSubCollection = async () => {
    await addDoc(collection(firestore, "cities/zbc8BHCYSqj2an9elGb2/places"), {
      name: "This is a place",
      desc: "Awesome Desc",
      date: Date.now(),
    });
  }

  const getDocument = async () => {
    const ref = doc(firestore, "cities", "zbc8BHCYSqj2an9elGb2");
    const snap = await getDoc(ref);

    console.log(snap.data());
  }

  const getDocumentsByQuery = async () => {
    const collectionRef = collection(firestore, "users");
    const q = query(collectionRef, where("isMale", "==", true));
    const snapshot = await getDocs(q);
    snapshot.forEach((data) => console.log(data.data()));
  }

  const update = async () => {
    const docRef = doc(firestore, "cities", "zbc8BHCYSqj2an9elGb2");
    await updateDoc(docRef, {
      name: "Lahore"
    })
  }

  return (
    <>
      <div className="App">
        <h2>Firebase 4 FireStore</h2>
        <button onClick={writeData}>Put Data</button>
        <button onClick={makeSubCollection}>Put SubCollection</button>
        <button onClick={getDocument}>get Document</button>
        <button onClick={getDocumentsByQuery}>get Documents By Query</button>
        <button onClick={update}> upDate Data</button>
      </div>
    </>
  )
}

export default App
