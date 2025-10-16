import {
  Flex,
  Text,
  Button,
  Icon,
  VStack,
  Popover,
  HStack,
} from "@chakra-ui/react";
import FilterIcon from "./icons/FilterIcon";
import { STATUSES } from "./data";
import { ColorIcon } from "./StatusCell";

function StatusItem({ status }) {
  return (
    <Flex
      align="center"
      cursor="pointer"
      fontWeight="bold"
      borderRadius={5}
      p={1.5}
      _hover={{ bg: "gray.800" }}
    >
      <ColorIcon color={status.color} mr={3} />
      {status.name}
    </Flex>
  );
}

export function FilterPopover() {
  return (
    <Popover.Root >
      <Popover.Trigger asChild>
        <Button 
          size="sm"
          leftIcon={<Icon as={FilterIcon} fontSize={18} />}
        >
          Filters
        </Button>
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.CloseTrigger />
          <Popover.Body>
            <Text fontSize="md" fontWeight="bold" mb={4}>
              Filter by
            </Text>
            <Text fontWeight="bold" color="gray.400" mb={1}>
              Status
            </Text>
            <VStack align="flex" spacing={1}>
              {STATUSES.map((status) => (
                <StatusItem status={status} key={status.id} />
              ))
              }
            </VStack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
