import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import TestHome from "./TestHome";


export default function LivePreviewExample() {
  const [recipeeData, setRecipeeData] = useState([])
  useEffect(() => {
    db.collection('recipeeData').where('rid' , '==', '3W4hP5zaRRkyQfsbCAop').onSnapshot(snapshot => {
      const data = firebaseLooper(snapshot)
      setRecipeeData(data)
    })
  }, [])
 

  return (
   <TestHome data={recipeeData}/>
  );
}