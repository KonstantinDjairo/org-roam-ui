import React, { useContext, useState } from 'react'
import { CUIAutoComplete, Item } from 'chakra-ui-autocomplete'
import { ThemeContext } from '../../util/themecontext'
import { NodeById } from '../../pages/index'

export interface SelectNodesProps {
  nodeById: NodeById
  selectedItems: Item[]
  onSelectedItemsChange: any
}

export const SelectNodes = (props: SelectNodesProps) => {
  const { nodeById = {}, selectedItems, onSelectedItemsChange } = props
  const { highlightColor } = useContext(ThemeContext)
  const nodes = Object.values(nodeById)
  const optionArray =
    nodes?.map((node) => {
      return { value: node?.id, label: node?.title } as Item
    }) || []

  return (
    <CUIAutoComplete
      labelStyleProps={{ fontWeight: 300, fontSize: 14 }}
      items={optionArray}
      label=""
      placeholder="Choose nodes... "
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) => onSelectedItemsChange(changes,selectedItems)}
      listItemStyleProps={{ overflow: 'hidden', fontSize: 12, height: 6 }}
      highlightItemBg="gray.400"
      toggleButtonStyleProps={{ variant: 'outline' }}
      inputStyleProps={{
        mt: 1,
        height: 6,
        focusBorderColor: highlightColor,
        color: 'gray.800',
        borderColor: 'gray.500',
        fontSize: 12,
      }}
      tagStyleProps={{
        justifyContent: 'flex-start',
        //variant: 'subtle',
        fontSize: 12,
        borderColor: highlightColor,
        borderWidth: 1,
        borderRadius: 'md',
        color: highlightColor,
        bg: '',
        height: 4,
        mb: 1,
        //paddingLeft: 4,
        //fontWeight: 'bold',
      }}
      hideToggleButton
      itemRenderer={(selected) => selected.label}
      //onCreateItem={(item) => null}
      disableCreateItem
    />
  )
}
