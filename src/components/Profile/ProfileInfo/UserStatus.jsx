import React from 'react';

export default class UserStatus extends React.PureComponent {
    state = {
        editMode: false,
        status: this.props.status,
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({state: this.props.status})
        }
    }

    editModeOn = () => {
        this.setState({editMode: true});
    }

    editModeOff = () => {
        this.setState({editMode: false});
        this.props.updateStatus(this.state.status);
    }

    changeStatus = (e) => {
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
