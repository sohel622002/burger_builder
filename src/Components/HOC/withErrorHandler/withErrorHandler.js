import React, { Component } from "react";

import Modal from "../../UI/Modal/Modal";

const withErrorHandler = (WrapedComponent, axios) => {
    return class extends Component {

        state={
            error : null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(res => {
                this.setState({ error : null})
                return res
            })
            this.resInterceptor = axios.interceptors.response.use(req => req, error => {
                this.setState({ error : error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error : null})
        }

        render() {

            return (
                <>
                    <Modal 
                        show={this.state.error}
                        closeModal={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapedComponent {...this.props} />
                </>
            );
        };
    };
};

export default withErrorHandler;