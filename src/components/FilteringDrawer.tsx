import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Stack,
  CheckboxGroup,
  Checkbox,
  SimpleGrid,
} from "@chakra-ui/react";
import { VFC } from "react";
import {
  categories,
  useActiveCategories,
  useFilteringText,
  useSetFilteringText,
  useSetActiveCategories,
} from "../state/filteringState";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const FilteringDrawer: VFC<Props> = ({ onClose, isOpen }) => {
  const filteringText = useFilteringText();
  const setFilteringText = useSetFilteringText();
  const activeCategories = useActiveCategories();
  const setActiveCategories = useSetActiveCategories();

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} colorScheme="blue">
      <DrawerOverlay />
      <DrawerContent borderTopRadius="xl" bgColor="black" color="white">
        <DrawerCloseButton />
        <DrawerHeader>絞り込み</DrawerHeader>
        <DrawerBody w="full" maxW="container.sm" margin="auto" color="gray.300">
          <Stack spacing="3" py="4">
            <Input
              placeholder="検索ワード"
              value={filteringText}
              onChange={(e) => setFilteringText(e.target.value)}
            />
            <CheckboxGroup
              value={activeCategories}
              colorScheme="yellow"
              onChange={(values) => setActiveCategories(values as string[])}
            >
              <SimpleGrid columns={2} gap="4">
                {categories.map((category) => (
                  <Checkbox key={category} value={category} fontWeight="bold">
                    {category}
                  </Checkbox>
                ))}
              </SimpleGrid>
            </CheckboxGroup>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
