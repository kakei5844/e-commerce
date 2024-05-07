import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import AddressCard from './AddressCard';

const AddAddressForm = () => {
    const address = {
        firstName: "Elvis",
        lastName: "Fan",
        streetAddress: "Metro City Plaza One",
        city: "N.T.",
        state: "Hong Kong",
        zipCode: "0000",
        mobile: "12345678"
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const address = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("streetAddress"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zipCode"),
            mobile: data.get("mobile"),
          };

        console.log("deliver to new address: ", address);
    }

    return (
        <div>
            <Grid container spacing={4}>
                {/* Address List */}
                <Grid className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll ">
                    <div className="p-5 py-7 border-b cursor-pointer">
                        <AddressCard address={address}/>
                        <Button
                            sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                            size='large'
                            variant='contained'
                        >
                            Deliver Here
                        </Button>
                    </div>
                </Grid>

                {/* Add Address Form */}
                <Grid item xs={12} lg={7}>
                    <Box className='border rounded-s-md shadow-md p-5'>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="streetAddress"
                                        name="streetAddress"
                                        label="Address"
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="state"
                                        name="state"
                                        label="State/Province/Region"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zipCode"
                                        name="zipCode"
                                        label="Zip / Postal code"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="mobile"
                                        name="mobile"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete="tel"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                                        size='large'
                                        variant='contained'
                                        type="submit"
                                    >
                                        Deliver Here
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default AddAddressForm;