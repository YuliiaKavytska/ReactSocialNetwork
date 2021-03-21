import React, {ChangeEvent} from 'react'
import {useState, useEffect} from 'react'

interface IProps {
    ProfileStatus: string | null
    updateStatus: (status: string) => void
}

const HookUserStatus: React.FC<IProps> = ({ProfileStatus, updateStatus}) => {
    let [editMode, setEditMode] = useState(false)
    let [status, changeStatus] = useState(ProfileStatus)

    useEffect(() => {
        changeStatus(ProfileStatus)
    }, [ProfileStatus])

    const editModeOn = () => {
        setEditMode(true)
    }

    const editModeOff = () => {
        setEditMode(false)
        if (!status) {
            throw new Error('Status should exist in Hook User STatus')
        } else {
            updateStatus(status)
        }
    }

    const editStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(e.target.value)
    }

    return <>
        {editMode
            ? <input
                autoFocus={true}
                defaultValue={status || ''}
                onBlur={editModeOff}
                onInput={editStatus}
            />
            : <p onDoubleClick={editModeOn}
            ><b>Status:</b> {ProfileStatus || '---'}</p>
        }
    </>
}

export default HookUserStatus
