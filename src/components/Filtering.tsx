import { Stack, Flex, Button, Text } from "@chakra-ui/react";
import { VFC } from "react";
import {
  categories,
  useActiveCategories,
  useFilteredSoundsCount,
  useSoundsAreFiltered,
  useToggleActiveCategory,
} from "../state/filteringState";

export const Filtering: VFC = () => {
  const activeCategories = useActiveCategories();
  const toggleActiveCategory = useToggleActiveCategory();
  const soundsAreFiltered = useSoundsAreFiltered();
  const filteredSoundsCount = useFilteredSoundsCount();

  return (
    <Stack spacing="4" py="4" color="white">
      <Flex gap="2" wrap="wrap">
        {categories.map((category) => {
          const isActive = activeCategories.includes(category);
          return (
            <Button
              key={category}
              size="sm"
              borderRadius="full"
              variant="outline"
              _hover={{ bgColor: "whiteAlpha.400" }}
              _active={{ bgColor: "whiteAlpha.600" }}
              opacity={isActive ? undefined : 0.5}
              role="checkbox"
              aria-checked={isActive}
              onClick={() => toggleActiveCategory(category)}
            >
              {category}
            </Button>
          );
        })}
      </Flex>
      {soundsAreFiltered && (
        <Text fontWeight="bold">絞り込み: {filteredSoundsCount} 件</Text>
      )}
    </Stack>
  );
};
