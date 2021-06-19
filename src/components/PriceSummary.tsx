import { Box, Table,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption, } from "@chakra-ui/react";

interface PriceSummaryProps {
  gbPrice: string;
  duration: number;
  gigabyte: number;
  upfrontPayment: boolean;
}

const PriceSummary = (props: PriceSummaryProps) => {
  const totalAmount = (price: number) => {
    let total = props.upfrontPayment? price - (price*.1): price
    return total.toFixed(2)
  }
  return (
    <Box textAlign="right" mb="10">
        <Table variant="simple" maxWidth="500px" marginRight="0" marginLeft="auto" size="lg">
          <TableCaption>Subscription summary</TableCaption>
          <Tbody>
            <Tr>
              <Td>Subscription</Td>
              <Td textAlign="right">{props.gigabyte} gb for {props.duration} months</Td>
            </Tr>
            <Tr>
              <Td>Amount</Td>
              <Td isNumeric>{props.gbPrice}</Td>
            </Tr>
            <Tr>
              <Td>Discount ({props.upfrontPayment?"10%":"0%"})</Td>
              <Td isNumeric>-{props.upfrontPayment?(parseFloat(props.gbPrice)*.1):"0"}</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total</Th>
              <Th isNumeric>{totalAmount(parseFloat(props.gbPrice))}</Th>
            </Tr>
          </Tfoot>
        </Table>

      </Box>
  );
};

export default PriceSummary;
