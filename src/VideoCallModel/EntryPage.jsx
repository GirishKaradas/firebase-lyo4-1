import { Button, Dialog, FormHelperText, Select, TextField, Toolbar } from "@material-ui/core";
import { useState } from "react";
import RenderVc from "../components/VideoCall/RenderVc";
import { db } from "../firebase";
import WebcamComponent from "./WebComponent";

function EntryPage() {
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState('relayed')
    const [configData, setConfigData] = useState({
        api_key: '47236004',
        session_id: '2_MX40NzIzNjAwNH5-MTYyMTY2ODExMDQ0Mn5GTFZuM2xUY0cySXNXcE9NbTkrZ0M1ck5-UH4',
        token: 'T1==cGFydG5lcl9pZD00NzIzNjAwNCZzaWc9OWI3YTg1ZWU3YTk0NzhjZGIwZDI4MTA2YmZhMGQ1ZjQ1NGUyNDM5NzpzZXNzaW9uX2lkPTJfTVg0ME56SXpOakF3Tkg1LU1UWXlNVFkyT0RFeE1EUTBNbjVHVEZadU0yeFVZMGN5U1hOWGNFOU5iVGtyWjBNMWNrNS1VSDQmY3JlYXRlX3RpbWU9MTYyMTY2ODExNyZub25jZT0wLjAzODM5NDU3NzY3NzA2NCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjI0MjYwMTE5JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'
    })

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    function handleChange() {
        db.collection('OpenTokConfig').doc(mode).onSnapshot(snapshot => {
            setConfigData(snapshot.data())
            console.log(snapshot.data())
        })
    }
    return (
        <div style={{height: '100vh'}}>

          <section className="text-gray-700 ">
            <div className="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-24">
              <div className="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
                <h2 className="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font"> VIDEO CALL</h2>
                <h1 className="mb-8 text-2xl font-black tracking-tighter text-black md:text-5xl title-font"> Join or Create a new Session</h1>
                <p className="mb-8 text-base leading-relaxed text-left text-blueGray-600 "> Join Meetings with end users and more. </p>
                <Select onChange={(e) => setMode(e.target.value)} fullWidth variant='outlined'>
                    <option value="relayed">Relayed</option>
                     <option value="routed">Routed</option>
                </Select>
                <FormHelperText>Select the mode to be used</FormHelperText>
                <Button onClick={handleChange}>Set mode</Button>
                <br />
               {configData &&  <h6>{configData.session_id}</h6>}
                <div className="flex flex-col justify-evenly lg:flex-row">
                  <button onClick={(e) => handleOpen()} className="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-yellow-900 rounded-lg hover:bg-yellow-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"> Instant Meeting</button>
                </div>
              </div>
              <div className="w-full lg:w-5/6 lg:max-w-lg md:w-1/2">
                {/* <img className="object-cover object-center rounded-lg " alt="hero" src="https://dummyimage.com/720x600/F3F4F7/8693ac"/> */}
                     <WebcamComponent/>
              </div>
            </div>
          </section>
        <Dialog open={open} fullScreen>
            <Toolbar>
                <Button onClick={(e) => handleClose()}>Close</Button>
            </Toolbar>
            <RenderVc config={configData}/>
        </Dialog>
        </div>
    )
}

export default EntryPage
