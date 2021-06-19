import {
  Box,
  FormControl,
  FormLabel,
  Switch,
  Flex,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import PriceCard from "./PriceCard";
import PriceSummary from "./PriceSummary";

interface SubscriptionProps {
  handleCompleteAction: () => void;
  plans: any;
  gbPrice: string;
  duration: number;
  gigabyte: number;
  upfrontPayment: boolean;
  handleDuration: (value: number) => void;
  handleGigabyte: (value: number) => void;
  handleUpfrontPayment: () => void;
}

const SubscriptionView = (props: SubscriptionProps) => {
  const [isLesserThan800] = useMediaQuery("(max-width: 800px)");

  const gbInCloud = [5, 10, 50]

  const calGbPrice = (gb: number) => {
    let price = 0.00
    if (props.plans?.subscription_plans) {
      let gbPrice = props.plans?.subscription_plans.find((plan: any) => plan.duration_months === props.duration)
      price = (gbPrice.price_usd_per_gb * gb)
    }
    return price.toFixed(2)
  }


  return (
    <>
      <Box mt="10">
        <Heading mb="5" size="md">
          Duration
        </Heading>
        <Flex flexDirection={isLesserThan800 ? "column" : "row"}>
          {props.plans?.subscription_plans?.map((plan: any, index: number) => (
            <PriceCard
              key={index}
              type="duration"
              selected={plan.duration_months === props.duration}
              onClick={() => props.handleDuration(plan.duration_months)}
              price={plan.price_usd_per_gb.toFixed(2)}
              description={`For ${plan.duration_months} months`}
            />
          ))}
          {/* <PriceCard selected={false} price="20" description="For 6 months" />
          <PriceCard selected={true} price="30" description="For 12 months" /> */}
        </Flex>
      </Box>
      <Box mt="10">
        <Heading mb="5" size="md">
          Amount of gigabytes in cloud
        </Heading>
        <Flex flexDirection={isLesserThan800 ? "column" : "row"}>
          {gbInCloud?.map((gb: any, index: number) => (
            <PriceCard
              key={index}
              selected={gb === props.gigabyte}
              onClick={() => props.handleGigabyte(gb)}
              price={calGbPrice(gb)}
              description={`For ${gb} gigabytes`}
            />
          ))}
        </Flex>
      </Box>
      <Box my="10">
        <FormControl display="flex" alignItems="center">
          <FormLabel
            htmlFor="upfront-payment"
            mb="0"
            fontWeight="bold"
            fontSize="xl"
          >
            Upfront Payment?
          </FormLabel>
          <Switch id="upfront-payment" size="lg" isChecked={props.upfrontPayment} onChange={props.handleUpfrontPayment} />
        </FormControl>
      </Box>
      <PriceSummary gbPrice={props.gbPrice}
        duration={props.duration}
        gigabyte={props.gigabyte}
        upfrontPayment={props.upfrontPayment} />
    </>
  );
};

export default SubscriptionView;
