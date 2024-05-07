import React from 'react';
import CartItem from './CartItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from '../../../State/Cart/Action';

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const { cart } = useSelector(store => store);
    console.log("cart ", cart)

    const handleCheckout = () => {
        // authentication
        // if not yet login, go to step=1
        // if logged in:
        navigate('/checkout?step=2');
    }

    useEffect(() => {
        dispatch(getCart(jwt));
    }, [jwt]);

    return (
        <div className="">
            <div className="lg:grid grid-cols-3 lg:px-16 relative">
                {/* Cart Items */}
                <div className="col-span-2">
                    <div className=" space-y-3">
                        {cart?.cartItems?.map((item) => (
                            <>
                                <CartItem item={item} showButton={true} />
                            </>
                        ))}
                    </div>
                </div>

                {/* Price Details and Check Out Button */}
                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
                    <div className="border p-5 bg-white shadow-lg rounded-md">
                        <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
                        <hr />

                        <div className="space-y-3 font-semibold">
                            <div className="flex justify-between pt-3 text-black ">
                                <span>Price</span>
                                <span>${cart?.cart?.totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="text-green-700">-${cart?.cart?.discount}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Amount</span>
                                <span className="text-green-700">${cart?.cart?.totalDiscountedPrice}</span>
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            onClick={handleCheckout}
                            sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
                        >
                            Check Out
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Cart;