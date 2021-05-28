import { useEffect } from "react";


export const firebaseLooper = (snapshot) => {
    let data = [];
    snapshot.forEach( doc => {
        data.push({
            ...doc.data(),
            id: doc.id
        })
    })
    return data
}

export const firebaseLooperTwo = (snapshot) => {
    let data = [];
    snapshot.forEach( doc => {
        data.push({
            ...doc.val()
           
        })
    })
    return data
}

