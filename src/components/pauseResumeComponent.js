import React, {useEffect, useState} from 'react';
import {API} from "../backend";
import RescheduleComponent from "./rescheduleComponent";

function PauseResumeComponent(props) {

    const [reason, setReason] = useState([])
    const [selectedReason, setSelectedReason] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [error, setError] = useState("")
    const [hideRadio, setHideRadio] = useState(true)
    const [hidePause, setHidePause] = useState(true)

    const fetchReasonDetails = () => {
        return fetch(`${API}reason`, {method: "GET"})
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const loadReason = () => {
        fetchReasonDetails()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(error)

                } else {
                    setReason(data)
                    // console.log("data:", data)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadReason()
    }, [])


    const postPause = pause => {
        return fetch(`${API}pause/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pause)
        })
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })
    };

    const [sendData, setSendData] = useState({
        pau_reason: "",
        ticket_id_fk: props.tkt_id,
        pause_state: false
    })

    const {pau_reason, ticket_id_fk, pause_state} = sendData;

    const handleChange = names => eve => {
        eve.preventDefault();
        setSendData({
            ...sendData, [names]: eve.target.value
        })
    }

    const onSubmit = (eve) => {
        eve.preventDefault();
        setSendData({
            ...sendData
        })
        postPause({
            pau_reason, ticket_id_fk, pause_state: true
        }).then(data => {
            setSendData({
                ...sendData,
                pau_reason, ticket_id_fk, pause_state
            })
            alert("Ticket is paused!!!")
            setHidePause(false)
        }).catch(err => {
            console.log(err)
        })
    }


    // console.log("send data:- ", onSubmit)
    // console.log("selected reason:- ", selectedState)

    return (
        <>
            {
                hidePause ?
                    <div className="row">
                        <div className="col-5 col-sm-5 col-md-5 col-lg-5">
                            <div className="row" onChange={(eve) => setSelectedState(eve.target.value)}>
                                <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                    <p className="mb-0"><i className={`far fa-image fa-3x text-primary`}/></p>
                                    <p className="small mb-0">Paused</p>
                                    <p className="mt-0 ml-3">
                                        <input type="radio" value="pause" name="ticketState"
                                               onClick={() => {
                                                   setHideRadio(false)
                                                   console.log("clicked pause")
                                               }} disabled={!hideRadio}/></p>
                                </div>
                                <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                    <p className="mb-0 ml-0"><i className={`far fa-image fa-3x ml-2 text-primary`}/></p>
                                    <p className="small mb-0">Rescheduled</p>
                                    <p className="mt-0 ml-4">
                                        <input type="radio" value="rescheduled" name="ticketState"
                                               onClick={() => {
                                                   setHideRadio(true)
                                                   console.log("clicked res")
                                               }} disabled={hideRadio}/></p>
                                </div>
                            </div>
                        </div>
                        <form>
                            <div className="col-6 col-md-6 col-sm-6 col-lg-6 offset-1">
                                <select
                                    className="rounded p-2 bg-light border-primary mt-2 font-weight-bold small shadow"
                                    value={selectedReason}
                                    onChange={(eve) => {
                                        setSelectedReason(eve.target.value)
                                        handleChange("selected")
                                        setSendData({
                                            ...sendData, pau_reason: eve.target.value
                                        })
                                    }}>
                                    {reason.map((item) =>
                                        <option key={item.prid} value={item.pau_reason}>{item.pau_reason}</option>
                                    )}
                                </select>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-block btn-sm btn-success ml-4" onClick={onSubmit}
                                    name="Sign Up">Pause
                            </button>
                        </form>
                    </div> : <RescheduleComponent/>
            }
        </>
    );
}

export default PauseResumeComponent;