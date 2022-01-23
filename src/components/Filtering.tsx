import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
  InputRightElement,
  IconButton,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { VFC } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import {
  categories,
  useActiveCategories,
  useFilteredSoundsCount,
  useFilteringText,
  useSetFilteringText,
  useSoundsAreFiltered,
  useToggleActiveCategory,
} from "../state/filteringState";

export const Filtering: VFC = () => {
  const filteringText = useFilteringText();
  const setFilteringText = useSetFilteringText();
  const activeCategories = useActiveCategories();
  const toggleActiveCategory = useToggleActiveCategory();
  const soundsAreFiltered = useSoundsAreFiltered();
  const filteredSoundsCount = useFilteredSoundsCount();

  return (
    <Stack spacing="4" py="4" color="white">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={MdSearch} fontSize="xl" />
        </InputLeftElement>
        <Input
          placeholder="フィルタリング"
          aria-label="フィルタリング"
          value={filteringText}
          onChange={(e) => setFilteringText(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            borderRadius="full"
            variant="ghost"
            aria-label="フィルタリングクリア"
            size="sm"
            icon={<Icon as={MdClose} fontSize="xl" />}
            _hover={{}}
            _active={{}}
            onClick={() => setFilteringText("")}
          />
        </InputRightElement>
      </InputGroup>
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
