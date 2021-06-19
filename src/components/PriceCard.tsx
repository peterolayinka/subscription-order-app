import { Box, Text } from "@chakra-ui/react";

interface PriceCardProps {
  onClick: () => void;
  type?: "duration" | "gb";
  price?: string;
  selected: boolean;
  description: string;
}

const PriceCard = (props: PriceCardProps) => {
  const selectedBorder = `1px solid ${props.selected ? "#14223b" : "#0064ff"}`;
  const selectedBg = `${props.selected ? "#14223b" : "#e7f0ff"}`;
  const selectedColor = `${props.selected ? "#fff" : "#14223d"}`;

  return (
    <Box
      flex="1"
      m="4"
      borderRadius="10px"
      overflow="hidden"
      border={selectedBorder}
      cursor="pointer"
      onClick={props.onClick}
    >
      <Box pt="10" pb="5" px="4" bg={selectedBg} color={selectedColor}>
        {props.price ? (
          <Text fontSize="3em" fontWeight="bold">
            <Text
              as="span"
              fontSize=".5em"
              fontWeight="normal"
              verticalAlign="super"
            >
              $
            </Text>
            {props.price}
            {props.type === "duration" ? (
              <Text
                as="span"
                fontSize=".5em"
                fontWeight="normal"
                verticalAlign="super"
              >
                per gb
              </Text>
            ) : null}
          </Text>
        ) : null}
        <Text>{props.description}</Text>
      </Box>
      <Box px="4" pb="5">
        <Text mt="3">More infor...</Text>
        <Text
          p="4"
          mt="5"
          mb="3"
          borderRadius="10px"
          bg={selectedBg}
          color={selectedColor}
          textAlign="center"
          fontWeight="bold"
        >
          {props.selected ? "Selected Plan" : "Choose Plan"}
        </Text>
      </Box>
    </Box>
  );
};

export default PriceCard;
