import React, { Component } from 'react';
import { Alert, AlertContainer } from 'react-bs-notifier';
import { connect } from 'react-redux';


class Notification extends Component {

    HandleAlert = () => {
        this.props.AlertOff();
    }

    render() {
        if (this.props.AlertShow === false) return null;
        return (
            <div>
                <AlertContainer>
                    <Alert type={this.props.Types} onDismiss={() => this.HandleAlert()} timeout={1000}>{this.props.AlertContents}</Alert>
                </AlertContainer>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        AlertShow: state.AlertShow,
        AlertContents: state.AlertContent,
        Types : state.Type
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        AlertOff: () => {
            dispatch({
                type:"TURN_OFF"

            })
        },
        // AlertOn: () => {
        //     dispatch({
        //         type:"TURN_ON"

        //     })
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)