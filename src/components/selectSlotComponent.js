import React, {useEffect, useState} from 'react';
import {API} from "../backend";

function SelectSlotComponent(props) {

    const [slot, setSlot] = useState([])
    const [error, setError] = useState([])

    const getSlot = () => {
        return fetch(`${API}slots`, {method: "GET"})
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })
    }


    const loadTicket = () => {
        getSlot()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(error)

                } else {

                    setSlot(data);
                    console.log(data)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadTicket()
    }, [])

    const [sslot, ssetSlot] = useState('')
    const [value, setValue] = useState('')

    console.log(sslot)

    return (
        <>
            <div className="row m-0 p-0">
                {
                    slot.map((item) => {
                        return (
                            <>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 small m-0 p-0">
                                    <span className="btn btn-light border-success btn-sm m-2 p-1 small" onClick={() => {
                                        ssetSlot(item.slot_name)
                                        setValue(item.slot_name)
                                    }}><i
                                        className="fas fa-sun fa-lg" style={{color: "goldenrod"}} /> &nbsp;{item.slot_name}</span>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <button className="btn btn-sm btn-success text-dark mt-2 ml-2" style={{color: "black"}}>Reschedule </button>
            <span className="ml-3"><p className="badge badge-success rounded-pill pt-2 pb-2 mt-5">{value} selected</p></span>
        </>
    );
}

export default SelectSlotComponent;