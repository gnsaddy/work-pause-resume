import React, {useEffect, useState} from 'react';
import {API} from "../backend";

function NpiMemberComponent(props) {
    console.log(props.npi_memberId)

    const [npiDetails, setNpiDetails] = useState([])
    const [error, setError] = useState([])

    const fetchTicketDetails = () => {
        return fetch(`${API}service/npi/${props.npi_memberId}`, {method: "GET"})
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
                    setNpiDetails(data)
                    console.log("data:", data)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadTicket()
    }, [props.npi_memberId])

    const fetchDetail = () => {
        return (
            npiDetails.map((item) => {
                    console.log(item.npi_name)
                    return (
                        <>
                            <div className="row mt-2">
                                <div className="col-2 col-sm-2 col-md-2 col-lg-2 p-1">
                                    <img
                                        src={`https://joeschmoe.io/api/v1/${item.nmid}`}
                                        className="rounded-circle" alt="img" width="50" height="50"/>
                                </div>
                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 mt-3">
                                    <p className="small mb-1">{item.npi_member_name}</p>
                                    <h6 className="small m-0">{item.npi_member_design}</h6>
                                </div>
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3 mt-3 ">
                                    <p className="small float-right">
                                        <a href={`tel:${item.npi_member_contact}`}><i className="fas fa-phone mr-2"/></a>
                                        <a href={`tel:${item.npi_member_alt_contact}`}><i className="fas fa-phone mr-2"/></a>
                                    </p>
                                </div>
                            </div>
                        </>
                    )
                })
        )
    }

    return (
        <>
             <hr/>
            <p className="small font-weight-bold">Network Partner Details</p>
            <div className="row">
                <div className="col-2 col-sm-2 col-md-2 col-lg-2 p-1">
                    <img src="https://i.pinimg.com/originals/aa/08/65/aa08656f292342a47afebd5b0a896706.jpg"
                         className="rounded-circle" alt="img" width="50" height="50"/>
                </div>
                <div className="col-8 col-sm-8 col-md-8 col-lg-8 mt-3">
                    <p className="small">{props.name_of_npi}</p>
                </div>
            </div>
            {fetchDetail()}
        </>
    );
}

export default NpiMemberComponent;