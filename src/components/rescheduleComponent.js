import React, {useState} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SelectableContext from "react-bootstrap/SelectableContext";
import SelectSlotComponent from "./selectSlotComponent";

function RescheduleComponent(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedState, setSelectedState] = useState('')
    const [hideBtn, setHideBtn] = useState(false)
    console.log(startDate)
    console.log(selectedState)
    return (
        <>
            <p className="text-danger">Development in progress !!!</p>
            <div className="row">
                <div className="col-5 col-sm-5 col-md-5 col-lg-5">
                    <div className="row" onChange={(eve) => setSelectedState(eve.target.value)}>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <p className="mb-0"><i className={`far fa-image fa-3x text-primary`}/></p>
                            <p className="small mb-0">Paused</p>
                            <p className="mt-0 ml-3">
                                <input type="radio" value="pause" name="ticketState" disabled={true}/></p>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <p className="mb-0 ml-0"><i className={`far fa-image fa-3x ml-2 text-primary`}/></p>
                            <p className="small mb-0">Rescheduled</p>
                            <p className="mt-0 ml-4">
                                <input type="radio" value="rescheduled" name="ticketState"/></p>
                        </div>

                    </div>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 offset-1 offset-lg-1">
                    <DatePicker isClearable selected={startDate} onChange={date => setStartDate(date)}
                                placeholderText="Select date" className="border-dark rounded bg-light mt-2"
                                style={{color: "black"}}/><br/>
                    <button className="btn bg-transparent border-info btn-sm w-75 text-dark mt-4 rounded" onClick={() => setHideBtn(true)}>Choose
                        Slot  &nbsp;<i className="far fa-clock"/></button>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    { hideBtn ? <SelectSlotComponent /> : null}
                </div>
            </div>
        </>
    );
}

export default RescheduleComponent;