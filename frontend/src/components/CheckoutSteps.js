import React from 'react';

export default function CheckoutSteps(props){
     return (
            <div className="rows checkout-steps">
                <div className={props.step1? 'active': ''}>Sign-In</div>
                <div className={props.step2? 'active': ''}>Shipping</div>
                <div className={props.step3? 'active': ''}>Place Order</div>
                {/* <div className={props.step4? 'active': ''}>Place Order</div> */}
            </div>
        );
};