import React, {useEffect, useState} from 'react';

import {API} from "../backend";

const getTicket = () => {
    return fetch(`${API}ticket`, {method: "GET"})
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

function TicketComponent(props) {
    const [tickets, setTicket] = useState([])
    const [error, setError] = useState([])

    const loadTicket = () => {
        getTicket()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(error)

                } else {

                    setTicket(data);
                    // console.log(data)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadTicket()
    }, [])

    const [selected, setSelected] = useState(false);

    const determineItemStyle = (i) => {
        const isItemSelected = selected === i;
        return isItemSelected ? "text-success shadow" : "text-muted";
    }

    return (
        <>
            <div className="container-fluid m-0 p-0 mt-1">
                <div className="card border-0 ">
                    {
                        tickets.map((items, index) => {
                            return (
                                <>
                                    <div className={ `card-body ${determineItemStyle(items.gtid)}`} key={items.gtid}
                                             onClick={() => {
                                                 setSelected(items.gtid)
                                             }}>
                                        <div className="row">
                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 m-0 p-0">
                                                <img
                                                    src={`https://robohash.org/${items.gtid}.png?size=50x50&set=set1`}
                                                    alt={items.gtid} width="50" height="50"/>
                                            </div>
                                            <div className="col-7 col-sm-7 col-md-7 col-lg-7 mt-2 mr-0">
                                                <span onClick={() =>
                                                    props.handleId(items.gtid)
                                                } style={{cursor: "wait"}}>
                                                    <p className="small mt-2">{items.ticket_reason}</p>
                                                </span>

                                            </div>
                                            <div className="col-3 col-sm-3 col-md-3 col-lg-3 p-0 mr-0 ml-0 mt-3">
                                                <p className="small">{items.joined_on.slice(16, 22)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default TicketComponent;

