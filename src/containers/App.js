import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import DetailOrder from './Customer/Order/DetailOrder';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';

import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';

import HomePage from './HomePage/HomePage'

import CustomScrollbars from '../components/CustomScrollbars';
import Header from './Header/Header';

import CustomerHome from './Customer/CustomerHome/CustomerHome';
import Register from './Auth/Register';
import Forgot from './Auth/Forgot';
import New from './Customer/CustomerHome/New/New';
import DichVuGH from './System/ServiceNews/DichVuGH';
import DichVuKB from './System/ServiceNews/DichVuKB';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        {/* {this.props.isLoggedIn && <Header />} */}

                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={'/register'} component={userIsNotAuthenticated(Register)} />
                                    <Route path={'/forgot'} component={userIsNotAuthenticated(Forgot)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={'/customer'} component={CustomerHome} />
                                    <Route path={"/orders/:id"} component={DetailOrder}></Route>
                                    <Route path={"/news/:id"} component={New}></Route>
                                    <Route path={"/news"} component={New}></Route>
                                    <Route path={"/services/dich-vu-giao-hang"} component={DichVuGH}></Route>
                                    <Route path={"/services/dich-vu-kho-bai"} component={DichVuKB}></Route>
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);