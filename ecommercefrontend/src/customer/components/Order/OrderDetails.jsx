import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import AddressCard from "../Address/AddressCard";
import { deepPurple } from "@mui/material/colors";
import OrderTracker from './OrderTracker';
import StarIcon from "@mui/icons-material/Star";

const OrderDetails = () => {

    const order = {
        orderId: 1,
        orderDate: "2021-02-05T11:00:00",
        deliveryDate: "2021-02-10T14:00:00",
        shippingAddress: {
            firstName: "Elvis",
            lastName: "Fan",
            streetAddress: "Metro City Plaza One",
            city: "N.T.",
            state: "Hong Kong",
            zipCode: "0000",
            mobile: "12345678"
        },
        totalPrice: 200,
        totalDiscountedPrice: 180,
        discount: 20,
        orderStatus: "CONFIRMED",
        orderItems: [
            {
                id: 1,
                product: {
                    "id": 1,
                    "title": "Coach Jacket",
                    "description": "Natural texture goes well with any outfit.",
                    "price": 100,
                    "discountedPrice": 90,
                    "discountPercent": 10,
                    "quantity": 50,
                    "brand": "Brand A",
                    "color": "Beige",
                    "sizes": [
                        {
                            "name": "S",
                            "quantity": 10
                        },
                        {
                            "name": "M",
                            "quantity": 20
                        }
                    ],
                    "imageUrl": "https://img.cdn.91app.hk/webapi/imagesV3/Cropped/SalePage/364164/0/638375472385270000?v=1",
                    "ratings": [],
                    "reviews": [],
                    "numRatings": 0,
                    "category": {
                        "id": 3,
                        "name": "jacket",
                        "parentCategory": {
                            "id": 2,
                            "name": "clothing",
                            "parentCategory": {
                                "id": 1,
                                "name": "men",
                                "parentCategory": null,
                                "level": 1
                            },
                            "level": 2
                        },
                        "level": 3
                    },
                    "createdAt": null
                },
                size: "M",
                quantity: 2,
                price: 200,
                discountedPrice: 180,
                userId: 1
            }
        ]
    }

    return (
        <div className=" px-2 lg:px-36 space-y-7 ">
            <Grid container className="p-3 shadow-lg">
                <Grid xs={12}>
                    <p className="font-bold text-lg py-2">Delivery Address</p>
                </Grid>
                <Grid item xs={6}>
                    <AddressCard address={order?.shippingAddress} />
                </Grid>
            </Grid>
            
            <Box className="p-5 shadow-lg border rounded-md">
                <Grid
                    container
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                    <Grid item xs={9}>
                        <OrderTracker
                            activeStep={
                                order?.orderStatus === "PLACED"
                                    ? 0
                                    : order?.orderStatus === "CONFIRMED"
                                        ? 1
                                        : order?.orderStatus === "SHIPPED"
                                            ? 2
                                            : 3
                            }
                        />
                    </Grid>
                    <Grid item>
                        {order?.orderStatus === "DELIVERED" && <Button sx={{ color: "" }} color="error" variant="text" >
                            RETURN
                        </Button>}

                        {order?.orderStatus !== "DELIVERED" && <Button sx={{ color: deepPurple[500] }} variant="text">
                            cancel order
                        </Button>}
                    </Grid>
                </Grid>
            </Box>

            <Grid container className="space-y-5">
        {order?.orderItems.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              {" "}
              <div className="flex  items-center ">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item?.product.imageUrl}
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p className="">{item.product.title}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: pink</span> <span>Size: {item.size}</span>
                  </p>
                  <p>Seller: {item.product.brand}</p>
                  <p>${item.price} </p>
                </div>
              </div>
            </Grid>
            <Grid item>
              {
                <Box
                  sx={{ color: deepPurple[500] }}
                  className="flex items-center cursor-pointer"
                >
                  <StarIcon
                    sx={{ fontSize: "2rem" }}
                    className="px-2 text-5xl"
                  />
                  <span>Rate & Review Product</span>
                </Box>
              }
            </Grid>
          </Grid>
        ))}
      </Grid>
        </div>
    );
};
// sx={{width:"10px",height:"10px"}}
export default OrderDetails;
