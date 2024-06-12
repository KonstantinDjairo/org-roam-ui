import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../util/themecontext'
//import { initialFilter } from '../config'

export interface SelectIdProps {
  options: NodeById
  //filter: typeof initialFilter
  //setFilter: any
  //listName: 'tagsBlacklist' | 'tagsWhitelist' | 'linktagsBlacklist' | 'linktagsWhitelist' | 'dirsAllowlist' | 'dirsBlocklist'
  //displayName: string
  //labelFilter?: string
}

export const SelectId = (props: SelectIdProps) => {
  //const { filter, labelFilter, setFilter, options = [] } = props
  const { options = [] } = props
  const { highlightColor } = useContext(ThemeContext)
  const optionArray =
    options?.map((option) => {
      //return { value: option, label: labelFilter ? option.replace(labelFilter, '') : option }
      return { value: option.id, label: option.title }
    }) || []

//  const [selectedItems, setSelectedItems] = useState<typeof optionArray>(
//    filter[listName]?.map((option) => {
//      return {
//        value: option,
        //label: labelFilter ? (option as string)?.replace(labelFilter, '') : option,
//        label: option,
//      }
//    }) || [],
//  )

  return (
    <CUIAutoComplete
      labelStyleProps={{ fontWeight: 300, fontSize: 14 }}
      items={optionArray}
      label=""
      placeholder="Node... "
      onCreateItem={(item) => null}
      disableCreateItem={true}
      //      selectedItems={selectedItems}
      //      onSelectedItemsChange={(changes) => {
      //        if (changes.selectedItems) {
      //          setSelectedItems(changes.selectedItems)
      //          setFilter({ ...filter, [listName]: changes.selectedItems.map((item) => item.value) })
      //        }
      //      }}
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
      disableCreateItem="false"
      hideToggleButton="false"
    />
  )
      }
