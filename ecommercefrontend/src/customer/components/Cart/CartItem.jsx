// Cart cart, 
// Product product, 
// String size, 
// int quantity, 
// double price, 
// double discountedPrice,
// long memberId

import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React from 'react';
import { useDispatch } from 'react-redux';

const CartItem = ({ item, showButton }) => {
    const dispatch = useDispatch();

    return (
        <div className='p-5 shadow-lg border rounded-md'>
            <div className='flex items-center'>
                {/* Product Image at the left */}
                <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                    <img 
                        className='w-full h-full object-cover object-top' 
                        src={item?.product.imageUrl} 
                    />
                </div>

                {/* Product information at the right */}
                <div className="ml-5 space-y-1">
                    <p className="font-semibold">{item?.product?.title}</p>
                    <p className="opacity-70">Size: {item?.size}, Color: Item Color</p>
                    <p className="opacity-70 mt-2">Brand: {item?.product?.brand}</p>
                    <div className="flex space-x-2 items-center pt-3">
                        <p className="opacity-50 line-through">${item?.product.price}</p>
                        <p className="font-semibold text-lg">${item?.product.discountedPrice}</p>
                        <p className="text-green-600 font-semibold">
                        {item?.product.discountPercent}% off
                        </p>
                    </div>
                </div>

            </div>

            <div className="lg:flex items-center lg:space-x-10 pt-4">
                <div className="flex items-center space-x-2 ">
                <IconButton>
                    <RemoveCircleOutlineIcon />
                </IconButton>

                <span className="py-1 px-7 border rounded-sm">1</span>
                <IconButton>
                    <AddCircleOutlineIcon />
                </IconButton>
                </div>

                <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
                
                <Button variant="text">
                    Remove{" "}
                </Button>
                
                </div>
            </div>

        </div>
    );
}
 
export default CartItem;

