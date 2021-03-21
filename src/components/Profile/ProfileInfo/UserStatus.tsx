import React from 'react';

interface IProps {
    status: string
    updateStatus: (status: string) => void
}

interface IState {
    editMode: boolean
    status: string
}

export default class UserStatus extends React.PureComponent<IProps, IState> {
    state = {
        editMode: false,
        status: this.props.status,
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    editModeOn = () => {
        this.setState({editMode: true});
    }

    editModeOff = () => {
        this.setState({editMode: false});
        this.props.updateStatus(this.state.status);
    }

    changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.target.value});
    }

    render() {
        let {editMode} = this.state;
        return <>
            {editMode
                ? <input
                    autoFocus={true}
                    defaultValue={this.state.status}
                    onBlur={this.editModeOff}
                    onInput={this.changeStatus}
                />
                : <p onDoubleClick={this.editModeOn}
                >Status: {this.props.status || '---'}</p>
            }
        </>
    };
}
