import { Button } from "@material-ui/core"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { db } from "../../../firebase"
import { firebaseLooper } from "../../../utils/tools"

function IQHeader({match}) {
  const [key, setKey] = useState('')
  useEffect(() =>{
    db.collection('IQ')
    .where('key', '==', `${match.params.id}`)
    .onSnapshot(snap => {
      const data = firebaseLooper(snap)
      setKey(data[0].mid)
    })
  }, [])
	return (
		<div>
		
    <nav className="bg-white shadow dark:bg-gray-800">

        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
            
            <Button component={NavLink} to={`/IQ/${match.params.id}/index`} className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6 hover:text-yellow-900">Index</Button>

            <Button component={NavLink} to={`/IQ/${match.params.id}/scope`} className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:text-yellow-900 mx-1.5 sm:mx-6">Scope</Button>

            <Button component={NavLink} to={`/IQ/${match.params.id}/drawing`} className="border-b-2 border-transparent  dark:hover:text-gray-200 hover:text-yellow-900 mx-1.5 sm:mx-6">Electrical Drawing</Button>

            <Button component={NavLink} to={`/IQ/${match.params.id}/control`} className="border-b-2 border-transparent  dark:hover:text-gray-200 hover:text-yellow-900 mx-1.5 sm:mx-6">Control Panel</Button>

		 <Button component={NavLink} to={`/IQ/${match.params.id}/software`} className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:text-yellow-900mx-1.5 sm:mx-6">Software</Button>
      <Button component={NavLink} to={`/machine-data/${key}/IQ`} className="border-b-2 border-transparent dark:hover:text-gray-200 hover:text-indigo-900 mx-1.5 sm:mx-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
</svg>

        </Button>
  
        </div>
    </nav>
		</div>
	)
}

export default IQHeader
