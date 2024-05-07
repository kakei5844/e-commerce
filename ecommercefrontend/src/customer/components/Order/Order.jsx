import { Box, Grid } from '@mui/material'
import React from 'react'
import OrderCard from './OrderCard';

const orderStatus = [
    { label: "On The Way", value: "onTheWay" },
    { label: "Delivered", value: "delevered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", vlue: "returned" },
];

const orders = [
  { orderId: 1,
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
    orderStatus: "DELIVERED",
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
      },
      {
        id: 2,
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
]


const Order = () => {
  return (
    <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        {/* Filters */}
        <Grid item xs={2.5} className="">
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filters</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    type="checkbox"
                    defaultChecked={option.checked}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        
        {/* Order Cards */}
        <Grid item xs={9}>
          <Box className="space-y-5 ">
            {orders?.length>0 && orders?.map((order)=> {
              return order?.orderItems?.map((item)=> <OrderCard item={item} order={order} key={item.id}/>)
            })}
          </Box>
        </Grid>

    </Grid>
    </Box>
  )
}

export default Order