import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox
} from "@chakra-ui/react";

import PriceSummary from "./PriceSummary";

interface ConfirmationViewProps {
  handleEmail: (value: string) => void;
  handleAcceptTerms: () => void;
  email: string;
  gbPrice: string;
  duration: number;
  gigabyte: number;
  acceptTerms: boolean;
  upfrontPayment: boolean;
}

const ConfirmationView = (props: ConfirmationViewProps) => {

  return (
    <>
      <Box m="4" >
        <FormControl id="ccNumber" mb="10">
          <FormLabel>Email</FormLabel>
          <Input required type="email" value={props.email} onChange={(event) => props.handleEmail(event.target.value)} />
        </FormControl>
        <Checkbox size="md" value={props.acceptTerms.toString()} onChange={props.handleAcceptTerms}>
          Check this box to accept our terms and conditions.
        </Checkbox>
      </Box>
      <PriceSummary gbPrice={props.gbPrice}
        duration={props.duration}
        gigabyte={props.gigabyte}
        upfrontPayment={props.upfrontPayment} />
    </>
  );
};

export default ConfirmationView;
