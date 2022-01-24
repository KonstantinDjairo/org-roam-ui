import { DeleteIcon } from '@chakra-ui/icons'
import {
  Text,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  StackDivider,
  VStack,
  Button,
} from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import React, { useState } from 'react'
import { LinkTagColors } from '../../config'

export interface LinkTagColorPanelProps {
  tags: string[]
  highlightColor: string
  colorList: string[]
  linktagColors: LinkTagColors
  setLinkTagColors: any
}
export const LinkTagColorPanel = (props: LinkTagColorPanelProps) => {
  const { colorList, linktagColors, setLinkTagColors, highlightColor, tags } = props
  const linktagArray = tags.map((tag) => {
    return { value: tag, label: tag }
  })

  const [selectedItems, setSelectedItems] = useState<typeof linktagArray>(
    Object.keys(linktagColors).map((tag) => {
      return { value: tag, label: tag }
    }),
  )

  return (
    <Box>
      <CUIAutoComplete
        items={linktagArray}
        labelStyleProps={{ fontWeight: 300, fontSize: 14 }}
        label="Add link tag to color"
        placeholder=" "
        disableCreateItem={true}
        selectedItems={selectedItems}
        onSelectedItemsChange={(changes) => {
          if (changes.selectedItems) {
            setSelectedItems(Array.from(new Set(changes.selectedItems)))
            setLinkTagColors(
              Object.fromEntries(
                Array.from(new Set(changes.selectedItems)).map((item) => {
                  return [item.label, linktagColors[item.label] ?? 'gray.600']
                }),
              ),
            )
          }
        }}
        listItemStyleProps={{ overflow: 'hidden' }}
        highlightItemBg="gray.400"
        toggleButtonStyleProps={{ variant: 'outline' }}
        inputStyleProps={{
          height: 8,
          focusBorderColor: highlightColor,
          color: 'gray.800',
          borderColor: 'gray.500',
        }}
        tagStyleProps={{
          display: 'none',
          rounded: 'full',
          bg: highlightColor,
          height: 8,
          paddingLeft: 4,
          fontWeight: 'bold',
        }}
        hideToggleButton
        itemRenderer={(selected) => selected.label}
      />
      <VStack
        spacing={2}
        justifyContent="flex-start"
        divider={<StackDivider borderColor="gray.500" />}
        align="stretch"
        color="gray.800"
      >
        {Object.keys(linktagColors).map((tag) => {
          return (
            <Flex key={tag} alignItems="center" justifyContent="space-between" width="100%" pl={2}>
              <Box width="100%">
                <Text>{tag}</Text>
              </Box>
              <Menu isLazy placement="right">
                <MenuButton as={Button} colorScheme="" color="black">
                  {<Box bgColor={linktagColors[tag]} borderRadius="sm" height={6} width={6}></Box>}
                </MenuButton>
                <Portal>
                  <MenuList minW={10} zIndex="popover" bgColor="gray.200">
                    {colorList.map((color: string) => (
                      <MenuItem
                        key={color}
                        onClick={() =>
                          setLinkTagColors({
                            ...linktagColors,
                            [tag]: color,
                          })
                        }
                        justifyContent="space-between"
                        alignItems="center"
                        display="flex"
                      >
                        <Box bgColor={color} borderRadius="sm" height={6} width={6}></Box>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Portal>
              </Menu>
              <IconButton
                aria-label="Delete tag color"
                variant="ghost"
                icon={<DeleteIcon />}
                onClick={() => {
                  setLinkTagColors(
                    Object.fromEntries(
                      Array.from(new Set(selectedItems)).map((item) => {
                        return [item.label, linktagColors[item.label] ?? 'gray.600']
                      }),
                    ),
                  )
                  setSelectedItems(selectedItems.filter((item) => item.value !== tag))
                }}
              />
            </Flex>
          )
        })}
      </VStack>
    </Box>
  )
}
