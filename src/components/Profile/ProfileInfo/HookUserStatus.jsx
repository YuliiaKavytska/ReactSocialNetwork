import React from 'react';
import {useState, useEffect} from 'react';

const HookUserStatus = props => {
    let [editMode, setEditMode] = useState(false);
    let [status, changeStatus] = useState(props.status);

    useEffect((e) => {
        changeStatus(props.status);
    }, [props.status]);

    const editModeOn = () => {
        setEditMode(true);
    }

    const editModeOff = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const editStatus = (e) => {
        changeStatus(e.target.value);
    }

    return <>
        {editMode
            ? <input
                autoFocus={true}
                defaultValue={status}
                onBlur={editModeOff}
                onInput={editStatus}
            />
            : <p onDoubleClick={editModeOn}
            >Status: {props.status || '---'}</p>
        }
    </>
}

export default HookUserStatus;
