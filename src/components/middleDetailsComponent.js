import {API} from "../backend";
import React, {useEffect, useState} from "react";
import PauseResumeComponent from "./pauseResumeComponent";


function MiddleDetailsComponent(props) {

    const [ticket, setTicket] = useState([])
    const [error, setError] = useState([])
    const [hideBtn, setHideBtn] = useState(true)
    const [progress, setProgress] = useState(50)


    let ttid = 0
    const getTid = () => {
        if (typeof props.tid != "undefined" && props.tid > 0) {
            // console.log("if > ", props.tid)
            ttid = props.tid
        } else {
            ttid = 1
        }
        return ttid
    }

    // console.log("-->", props.tid)
    const fetchTicketDetails = () => {
        return fetch(`${API}ticket/${getTid()}`, {method: "GET"})
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const loadTicket = () => {
        fetchTicketDetails()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(error)

                } else {
                    setTicket(data)
                    setHideBtn(true)
                    // console.log("data:", data[0].id)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadTicket()
    }, [props.tid])

    const styles = {
        width: `${progress}%`,
        backgroundColor: '#e13232',
    }


    return (
        <>
            <div className="container-fluid mt-5">
                {ticket.map((item) => {
                    return (
                        <>
                            <div className="row" key={item.gtid}>
                                <div className="col-7 col-sm-8 col-md-8 col-lg-8">
                                    <p className="small" key={item.gtid}>
                                        ID {item.ticket_id} | {item.ticket_reason} | Urgent |0:56|North-West Delhi
                                    </p>
                                </div>
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                                    <p className="small">{item.joined_on.slice(4, 16)},{item.joined_on.slice(16, 22)}</p>

                                </div>
                                <div className="col-2 col-sm-1 col-md-1 col-lg-1">
                                    <span onClick={() => {
                                        props.handleCID(item.cust_id)
                                    }}>
                                        <i className="fas fa-user-cog text-primary"/>
                                    </span>
                                </div>
                            </div>
                            <br/>

                            <div className="row">
                                <div className="col-2 col-sm-1 col-md-1 col-lg-1 ">
                                    <i className="far fa-image fa-2x"/>
                                </div>
                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 ">
                                    <p className="small">{item.amb_name}</p>
                                    <p className="small font-italic">Ambassador on the way for pick up</p>
                                </div>
                                <div className="col-5 col-sm-6 col-md-6 col-lg-6">
                                    <div className="progress" style={{height: 11}}>
                                        <div className="progress-bar small font-weight-bolder" style={styles}>{progress}%</div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-1 col-sm-1 col-md-1 col-lg-1 p-1 ">
                                    <img
                                        src={`https://robohash.org/${item.gtid}.png?size=50x50&set=set1`}
                                        className="rounded-circle" alt="img" width="50" height="50"/>
                                </div>
                                <div className="col-9 col-sm-9 col-md-9 col-lg-9 mt-3">
                                    <div className="container-fluid">
                                        <a href={`tel:${item.amb_contact}`} className="btn btn-primary"><i
                                            className="fas fa-phone-volume"/>
                                        </a>
                                        &nbsp;
                                        <a href={`tel:${item.amb_contact}`} className="btn btn-primary">Call
                                            Ambassador</a>
                                    </div>
                                    <div className="container-fluid mt-5">
                                        <button className="btn btn-primary rounded-circle mr-2"><i
                                            className="fas fa-play"/>
                                        </button>
                                        <button className="btn btn-primary rounded-circle mr-2"><i
                                            className="fas fa-pause"/>
                                        </button>
                                        <button className="btn btn-primary rounded-circle"><i className="fas fa-play"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/*<div className="col-1 col-sm-1 col-md-1 col-lg-1" />*/}
                                <div className="col-11 col-sm-11 col-md-11 col-lg-11">
                                    <div className="container-fluid mt-5">
                                        {
                                            hideBtn?
                                            <button
                                                onClick={() => {
                                                    setHideBtn(false)
                                                    setProgress(75)
                                                }}
                                                className="btn rounded-pill btn-sm"
                                                style={{backgroundColor: '#e76a46'}}>Next
                                                Step
                                            </button> : <PauseResumeComponent tkt_id={item.ticket_id}/>
                                        }
                                        &nbsp;
                                    </div>
                                </div>

                            </div>
                        </>
                    )
                })}
            </div>
        </>
    );
}

export default MiddleDetailsComponent;