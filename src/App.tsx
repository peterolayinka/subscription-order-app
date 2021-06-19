import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import {
  Img,
  Box,
  Button,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  ChakraProvider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import "./App.css";
import SubscriptionView from "./components/SubscriptionView";
import PaymentForm from "./components/PaymentForm";
import ConfirmationView from "./components/ConfirmationView";

function App() {
  const planUrl = "https://cloud-storage-prices-moberries.herokuapp.com/prices";

  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [currentAction, setCurrentAction] = useState<string>("subscription");
  const [plans, setPlans] = useState<any>({});
  const [duration, setDuration] = useState(12);
  const [gigabyte, setGigabyte] = useState(5);
  const [upfrontPayment, setUpfrontPayment] = useState(false);
  const [ccNumber, setCcNumber] = useState("");
  const [ccDate, setCcDate] = useState("");
  const [ccv, setCcv] = useState("");
  const [errors, setError] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(planUrl)
      .then((resp) => resp.json())
      .then((data) => setPlans(data));
  }, []);

  const actions = ["subscription", "payment", "confirmation"];


  const clearSubmission = () => {
    setSubmitted(false);
    setCompletedActions([])
    setCurrentAction("subscription")
    setDuration(12)
    setGigabyte(5)
    setUpfrontPayment(false)
    setCcNumber("")
    setCcDate("")
    setCcv("")
    setEmail("")
    setAcceptTerms(false)
  }

  const calGbPrice = (gb: number) => {
    let price = 0.0;
    if (plans?.subscription_plans) {
      let gbPrice = plans?.subscription_plans.find(
        (plan: any) => plan.duration_months === duration
      );
      price = gbPrice.price_usd_per_gb * gb;
    }
    return price.toFixed(2);
  };

  const handleCompleteAction = () => {
    if (!completedActions.includes(currentAction)) {
      setCompletedActions([...completedActions, currentAction]);
    }
  };
  const clearError = () => {
    setError([]);
  };
  const handleAcceptTerms = () => setAcceptTerms(!acceptTerms);
  const handleNext = () => {
    clearError();

    let currentActionIndex = actions.indexOf(currentAction);
    if (currentActionIndex !== -1) {
      if (currentAction !== actions[actions.length - 1]) {
        try {
          if (currentAction === actions[1] && (!ccNumber || !ccDate || !ccv)) {
            throw new Error("Please fill all forms");
          }

          setCurrentAction(actions[currentActionIndex + 1]);
        } catch (e) {
          setError([e.message]);
        }
      } else {
        try {
          if (currentAction === actions[2] && !email) {
            throw new Error("Please enter your email");
          }
          // make post request
          postData();
        } catch (e) {
          setError([e.message]);
        }
      }
    }
  };
  const handleGoBack = () => {
    clearError()
    let currentActionIndex = actions.indexOf(currentAction);
    if (currentActionIndex !== -1 && currentAction !== actions[0]) {
      setCurrentAction(actions[currentActionIndex - 1]);
    }
  };
  const handleDuration = (value: number) => {
    setDuration(value);
  };
  const handlegigabyte = (value: number) => {
    setGigabyte(value);
  };
  const handleUpfrontPayment = () => {
    setUpfrontPayment(!upfrontPayment);
  };

  const handleCcNumber = (value: string) => {
    setCcNumber(value);
  };
  const handleCcDate = (value: string) => {
    setCcDate(value);
  };
  const handleCcv = (value: string) => {
    setCcv(value);
  };
  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const postData = async () => {
    setLoading(true);
    const rawResponse = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ a: 1, b: "Textual content" }),
    });
    const content = await rawResponse.json();
    setLoading(false);
    console.log(content)
    if (rawResponse.ok) {
      setSubmitted(true);
    }
  };

  const submissionProcess = () => {
    return (
      <Box>
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as="button" href="#">
              Plan
            </BreadcrumbLink>
          </BreadcrumbItem>

        </Breadcrumb>
        {errors.map((error: string, index: number) => (
          <Alert key={index} status="error" mt="5">
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <CloseButton
              onClick={clearError}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>
        ))}
        {currentAction === actions[0] ? (
          <SubscriptionView
            handleCompleteAction={handleCompleteAction}
            plans={plans}
            gbPrice={calGbPrice(gigabyte)}
            duration={duration}
            gigabyte={gigabyte}
            upfrontPayment={upfrontPayment}
            handleDuration={handleDuration}
            handleGigabyte={handlegigabyte}
            handleUpfrontPayment={handleUpfrontPayment}
          />
        ) : null}
        {currentAction === actions[1] ? (
          <PaymentForm
            ccNumber={ccNumber}
            ccDate={ccDate}
            ccv={ccv}
            handleCcNumber={handleCcNumber}
            handleCcDate={handleCcDate}
            handleCcv={handleCcv}
            gbPrice={calGbPrice(gigabyte)}
            duration={duration}
            gigabyte={gigabyte}
            upfrontPayment={upfrontPayment}
          />
        ) : null}
        {currentAction === actions[2] ? (
          <ConfirmationView
            email={email}
            acceptTerms={acceptTerms}
            handleAcceptTerms={handleAcceptTerms}
            handleEmail={handleEmail}
            gbPrice={calGbPrice(gigabyte)}
            duration={duration}
            gigabyte={gigabyte}
            upfrontPayment={upfrontPayment}
          />
        ) : null}

        {currentAction !== actions[0] ? (
          <Button
            size="lg"
            bg="#e7f0ff"
            color="#14223b"
            _hover={{ bg: "#ccc" }}
            onClick={handleGoBack}
            mr="4"
          >
            Back
          </Button>
        ) : null}
        <Button
          size="lg"
          bg="#14223b"
          color="#fff"
          _hover={{ bg: "#515459" }}
          onClick={handleNext}
          isLoading={isLoading}
          disabled={currentAction === actions[2] && !acceptTerms}
        >
          Continue
        </Button>
      </Box>
    );
  };

  const submissionCompleted = () => {
    return (
      <Box>
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          py="20"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Subscription Successful
          </AlertTitle>
          <AlertDescription maxWidth="md">
            Thanks for the patronage and enjoy our cloud services.
          </AlertDescription>
          <Button colorScheme="green" mt="20" onClick={clearSubmission} >Make new subscription</Button>
        </Alert>
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <Box maxWidth="1024px" margin="0 auto" px="4" pb="20">
        <Box>
          <Img
            src={logo}
            className="App-logo"
            alt="logo"
            width="50px"
            height="50px"
            mb="4"
            mt="4"
          />
          <Heading mb="3">Subscription</Heading>
        </Box>
        {!submitted ? submissionProcess() : submissionCompleted()}
      </Box>
    </ChakraProvider>
  );
}

export default App;
