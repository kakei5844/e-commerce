import React, { useEffect } from 'react';
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material';
import ProductReviewCard from './ProductReviewCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductById } from '../../../State/Product/Action';
import { addItemToCart } from '../../../State/Cart/Action';
import { Backdrop, CircularProgress } from "@mui/material";

// TODO
const reviews = [
    {
        review: "nice product, i love this jacket",
        member: {
            firstName: "John",
            lastname: "Ng"
        },
        createdAt: "dd/mm/yyyy" // LocalDateTime object
    },
    {
        review: "nice product, i love this jacket",
        member: {
            firstName: "John",
            lastname: "Ng"
        },
        createdAt: "dd/mm/yyyy" // LocalDateTime object
    },
    {
        review: "nice product, i love this jacket",
        member: {
            firstName: "John",
            lastname: "Ng"
        },
        createdAt: "dd/mm/yyyy" // LocalDateTime object
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState();
    const { customersProduct } = useSelector((store) => store);
    const [isLoaderOpen, setIsLoaderOpen] = useState(false);

    const handleLoderClose = () => {
        setIsLoaderOpen(false);
    };

    const handleAddToCart = () => {
        const data = { productId: productId, size: selectedSize.name, quantity: 1 };
        dispatch(addItemToCart(data));
        navigate('/cart');
    }

    useEffect(() => {
        dispatch(findProductById(productId));
    }, [productId]);

    useEffect(() => {
        if (customersProduct.loading) {
            setIsLoaderOpen(true);
        } else {
            setIsLoaderOpen(false);
        }
    }, [customersProduct]);


    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

                        <li key={customersProduct.product?.category?.parentCategory.parentCategory.id}>
                            <div className="flex items-center">
                                <a href='#' className="mr-2 text-sm font-medium text-gray-900 capitalize">
                                    {customersProduct.product?.category.parentCategory.parentCategory.name}
                                </a>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>

                        <li key={customersProduct.product?.category.parentCategory.id}>
                            <div className="flex items-center">
                                <a href='#' className="mr-2 text-sm font-medium text-gray-900 capitalize">
                                    {customersProduct.product?.category.parentCategory.name}
                                </a>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>

                        <li className="text-sm">
                            <a href='#' aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {customersProduct.product?.title}
                            </a>
                        </li>
                    </ol>
                </nav>

                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gay-y-10 px-4 pt-10'>
                    {/* Image */}
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img
                                src={customersProduct.product?.imageUrl}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                        {/* Brand Name and Product Title */}
                        <div className="lg:col-span-2">
                            <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900  ">
                                {customersProduct.product?.brand}
                            </h1>
                            <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                                {customersProduct.product?.title}
                            </h1>
                        </div>

                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Price information</h2>
                            {/* Prices */}
                            <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                                <p className="font-semibold">
                                    ${customersProduct.product?.discountedPrice}
                                </p>
                                <p className="opacity-50 line-through">
                                    ${customersProduct.product?.price}
                                </p>
                                <p className="text-green-600 font-semibold">
                                    {customersProduct.product?.discountPercent}% Off
                                </p>
                            </div>

                            {/* Ratings and reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>

                                <div className="flex items-center space-x-3">
                                    {/* TODO */}
                                    <Rating
                                        name="read-only"
                                        value={4.5}
                                        precision={0.5}
                                        readOnly
                                    />

                                    <p className="opacity-60 text-sm">{customersProduct.product?.numRatings} Ratings</p>
                                    {/* TODO */}
                                    <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        17 reviews
                                    </p>
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    </div>

                                    <RadioGroup
                                        value={selectedSize}
                                        onChange={setSelectedSize}
                                        className="mt-4"
                                    >
                                        <RadioGroup.Label className="sr-only">
                                            Choose a size
                                        </RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                                            {customersProduct.product?.sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    disabled={size.quantity < 1}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.quantity > 0
                                                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                                                            active ? "ring-1 ring-indigo-500" : "",
                                                            "group relative flex items-center justify-center rounded-md border py-1 px-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">
                                                                {size.name}
                                                            </RadioGroup.Label>
                                                            {size.quantity > 0 ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? "border" : "border-2",
                                                                        checked
                                                                            ? "border-indigo-500"
                                                                            : "border-transparent",
                                                                        "pointer-events-none absolute -inset-px rounded-md"
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line
                                                                            x1={0}
                                                                            y1={100}
                                                                            x2={100}
                                                                            y2={0}
                                                                            vectorEffect="non-scaling-stroke"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Add To Cart Button */}
                                <Button
                                    variant="contained"
                                    onClick={handleAddToCart}
                                    sx={{ padding: ".8rem 2rem", marginTop: "2rem", bgcolor: "#9155fd" }}
                                >
                                    Add To Cart
                                </Button>
                            </form>
                        </div>

                        {/* Description */}
                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{customersProduct.product?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='px-10'>
                    {/* Recent reviews */}
                    <h1 className="font-semibold text-lg pb-4">
                        Recent Review & Ratings
                    </h1>

                    <div className="border p-5">
                        <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <div className="space-y-5">
                                    {reviews.map((item) => (
                                        <ProductReviewCard item={item} />
                                    ))}
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                </section>

                <section>
                    <Backdrop
                        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoaderOpen}
                        onClick={handleLoderClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </section>;

            </div>
        </div>
    )
}
