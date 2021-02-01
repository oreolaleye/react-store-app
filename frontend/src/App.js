import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import OrderListScreen from './Screens/OrderListScreen';
import OrderScreen from './Screens/OrderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductScreen from './Screens/ProductScreen';
import ProfileScreen from './Screens/ProfileScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import SigninScreen from './Screens/SigninScreen';
import UserEditScreen from './Screens/UserEditScreen';
import UserListScreen from './Screens/UserListScreen';


function App() {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector((state) =>state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () =>{
        dispatch(signout());
    }

    return (
        <BrowserRouter>
            <div class="grid-container" >
                <header class="rows" >
                    <div class="">
                        <Link class="brand"
                            to="/" > shop store 
                        </Link>
                    </div >
                    <div class="" >
                        <Link to="/cart" > Cart 
                        {
                        cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                        )}
                        </Link>
                        {
                            userInfo? (
                                <div className="dropdown">
                                    <Link to='#'>{userInfo.name} <i className="fa fa-caret-down"></i></Link> 
                                    <ul className="dropdown-content" >
                                        <li>
                                            <Link to="/profile">User Profile</Link>
                                        </li>
                                        <li>
                                            <Link to="/orderhistory">Order History</Link>
                                        </li>
                                        <li>
                                            <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                        </li>
                                    </ul>
                                </div>
                            ):
                            (
                                <Link to="/signin" > Sign In </Link>
                            )
                        }
                        {userInfo && userInfo.isAdmin &&(
                            <div className="dropdown">
                                <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderList">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/userList">Users</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div >
                </header>
                <main >
                    <Route path="/cart/:id?" component= {CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen} exact></Route>
                    <Route path="/product/:id/edit" component={ProductEditScreen} exact ></Route>
                    <Route path="/signin" component={SigninScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/shipping" component={ShippingAddressScreen}></Route>
                    <Route path="/payment" component={PaymentMethodScreen}></Route>
                    <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                    <Route path="/order/:id" component={OrderScreen}></Route>
                    <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
                    <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
                    <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
                    <AdminRoute path="/orderlist" component={OrderListScreen} ></AdminRoute>
                    <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
                    <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
                    <Route path="/" component={HomeScreen} exact></Route>
                    
                </main>
                <footer class="rows  center" >
                    All rights reserved
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
