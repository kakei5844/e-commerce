import React from "react";
import { Badge, Button } from "@mui/material";
import CartItem from "../Cart/CartItem";
import AddressCard from "../Address/AddressCard";


const OrderSummary = () => {
  
  return (
    <div className="space-y-5">
        <div className="p-5 shadow-lg rounded-md border ">
            <AddressCard/>
        </div>

        <div className="">
            <div className="lg:grid grid-cols-3 lg:px-16 relative">
                {/* Cart Items */}
                <div className="col-span-2">
                    {[1,1,1,1,1].map((item) => <CartItem />)}
                </div>

                {/* Price Details and Check Out Button */}
                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
                    <div className="border p-5 bg-white shadow-lg rounded-md">
                        <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
                        <hr />

                        <div className="space-y-3 font-semibold">
                            <div className="flex justify-between pt-3 text-black ">
                                <span>Price</span>
                                <span>$Total Price</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="text-green-700">-$Total Discount</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Amount</span>
                                <span className="text-green-700">$ Discounted Price</span>
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
                        >
                            Check Out
                        </Button>
                    </div>
                </div>
            </div>

        </div>
      
    </div>


  );
};

export default OrderSummary;
