import {
    Box,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

import PriceSummary from "./PriceSummary";

interface PaymentFormProps {
    handleCcNumber: (value: string) => void;
    handleCcDate: (value: string) => void;
    handleCcv: (value: string) => void;
    ccNumber: string;
    gbPrice: string;
    ccDate: string;
    ccv: string;
    duration: number;
    gigabyte: number;
    upfrontPayment: boolean;
}

const PaymentForm = (props: PaymentFormProps) => {
    return (
        <>
            <Box m="4" >
                <FormControl id="ccNumber" mb="10">
                    <FormLabel>Credit Card Number</FormLabel>
                    <Input required type="number" value={props.ccNumber} onChange={(event) => props.handleCcNumber(event.target.value)} />
                </FormControl>
                <FormControl id="ccDate" mb="10">
                    <FormLabel>Credit Card Expiration Date</FormLabel>
                    <Input required type="date" value={props.ccDate} onChange={(event) => props.handleCcDate(event.target.value)} />
                </FormControl>
                <FormControl id="ccCode" mb="10">
                    <FormLabel>Credit Card Security Code (cvv)</FormLabel>
                    <Input required type="password" value={props.ccv} onChange={(event) => props.handleCcv(event.target.value)} />
                </FormControl>
            </Box>
            <PriceSummary gbPrice={props.gbPrice}
                duration={props.duration}
                gigabyte={props.gigabyte}
                upfrontPayment={props.upfrontPayment} />
        </>
    );
};

export default PaymentForm;
