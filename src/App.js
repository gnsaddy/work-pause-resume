import './App.css';
import TicketComponent from "./components/ticketComponent";
import MiddleDetailsComponent from "./components/middleDetailsComponent";
import RightDetailsComponent from "./components/rightDetailsComponent";
import FirstSIdeBarComponent from "./components/firstSIdeBarComponent";
import NavbarComponent from "./components/navbarComponent";
import React, {useState} from "react";


function App() {

    const [tid, setId] = useState([])
    const [cid, setCId] = useState([])

    const changeId =  (tid) => {
        setId(tid)
    }

    const changeCID = (cid) => {
        setCId(cid)
    }
    // console.log("cust_id-> ", cid)
    // console.log("ticket_id-> ", tid)
    return (
        <>
            <NavbarComponent/>
            <div className="container-fluid m-0 p-0 mt-5">
                <div className="row m-0 p-0">
                     <div className="col-2 col-sm-1 col-md-1 col-lg-1 d-flex m-0 p-0">
                        <div className="flex-fill con0">
                            <FirstSIdeBarComponent/>
                        </div>
                    </div>
                    <div className="col-10 col-sm-11 col-md-3 col-lg-3 d-flex m-0 p-0">
                        <div className="flex-fill con1">
                            <TicketComponent handleId={(tid) => {
                                changeId(tid)
                            }}/>
                        </div>
                    </div>
                    <div className="col-sm-11 col-md-5 col-lg-5 d-flex m-0 p-0">
                        <div className="flex-fill con2">
                            <MiddleDetailsComponent tid={tid} handleCID={(cid) => {
                                changeCID(cid)
                            }}/>
                        </div>
                    </div>
                    <div className="col-sm-11 col-md-3 col-lg-3 d-flex m-0 p-0">
                        <div className="flex-fill con3">
                            <RightDetailsComponent cid={cid}/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default App;