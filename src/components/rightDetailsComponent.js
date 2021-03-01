import React, {useEffect, useState} from 'react';
import {API} from "../backend";
import NpiMemberComponent from "./npi_memberComponent";

function RightDetailsComponent(props) {

    const [customerID, setCustomerID] = useState([])
    const [error, setError] = useState([])

    const fetchTicketDetails = () => {
        return fetch(`${API}service/${props.cid}`, {method: "GET"})
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
                    setCustomerID(data)
                    // console.log("data:", data)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadTicket()
    }, [props.cid])

    // console.log("--->> ", customerID.map(() =>{}).length)

    const getCid = () => {

        if (customerID.map((item) => {
            // console.log("if called-->")
        }).length === 0) {
            return (
                <>
                    <h6 className="text-danger">
                        Customer details is not available...
                    </h6>
                </>
            )
        } else if (typeof props.cid != "undefined" && props.cid > 0) {
            // console.log("else if called-->")
            return (
                <>
                    {
                        customerID.map((item) => {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col-9 col-sm-8 col-md-8 col-lg-8">
                                            <p className="small">Customer details</p>
                                        </div>
                                        <div className="col-3 col-sm-4 col-md-4 col-lg-4 ">
                                            <p className="small float-right">
                                                <a href={item.cust_contact}><i className="fas fa-phone mr-2"/></a>
                                                <a href={item.cust_alt_contact}><i className="fas fa-phone mr-2"/></a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 p-1">
                                            <img
                                                src={`https://joeschmoe.io/api/v1/${item.cust_id}`}
                                                className="rounded-circle" alt="img" width="50" height="50"/>
                                        </div>
                                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 mt-3">
                                            <p className="small">{item.cust_name}</p>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 p-1">
                                            <i className="far fa-image fa-2x ml-2"/>
                                        </div>
                                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 mt-2">
                                            <p className="small">Time & Address {item.npi_id}</p>
                                            <span><p
                                                className="small">Slot Time &nbsp; &nbsp; {item.slot}</p> </span>
                                        </div>
                                    </div>

                                    <div className="row mt-3" key={item.cust_id}>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <h6 className="p-0 mb-0 small" style={{marginLeft: 80}}>ETA - {parseInt(item.slot.slice(0,2))+2}:00 (4.6
                                                Kms)</h6>
                                            <p className="Line-2 bg-dark p-0 ml-3"/>
                                            <div className="row">
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 mt-0">
                                                    <p className="mt-0 small">{item.cust_address}</p>
                                                </div>
                                                <div className="col-6 col-sm-6 col-md-6 col-lg-6 mt-0">
                                                    <p className="mt-0 small">{item.npi_address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <NpiMemberComponent npi_memberId={item.npi_id} name_of_npi={item.npi_name}/>
                                </>
                            )
                        })
                    }
                </>
            )
        } else {
            // console.log("else called-->")
            return (
                <>
                    <h6 className="text-danger">Select customer to fetch details...</h6>
                </>
            )
        }

    }

    return (
        <>
            <div className="container-fluid mt-5">
                {getCid()}
            </div>
        </>
    );
}

export default RightDetailsComponent;