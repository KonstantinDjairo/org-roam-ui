'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'

//import Image from "next/image";
import { VStack, Flex, Box, IconButton } from '@chakra-ui/react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons'
import { BsBack } from 'react-icons/bs'
import { BiDotsVerticalRounded, BiFile, BiNetworkChart } from 'react-icons/bi'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ChakraProvider,
  Tooltip,
} from '@chakra-ui/react'
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';
import TextGrid from './TextGrid'
import { SelectId, SelectIdProps } from './SelectId'

function TModal(props) {
  const options = Object.values(props.nodeById)
  const { isOpenModal, onOpenModal, onCloseModal } = props
  //const { isOpen, onOpen, onClose } = useDisclosure()
  const [ layout, setLayout ] = useState<Layout>([]);

  const onAddItem = (id) => {
    /*eslint no-console: 0*/
    console.log("adding", id);
    console.log(layout)
    setLayout(
      // Add a new item. It must have a unique key!
      (layout as Array).concat({
        i: id,
        x: (layout.length * 3) % (props.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 3,
        h: 2
      }),
    );
  }

  const onLayoutChange = (layout) => {
    //console.log("PROPS:",props)
    //this.props.onLayoutChange(layout);
    setLayout(layout);
  }

  const onRemoveItem = (i) => {
    //console.log("removing", i);
    //console.log(layout);
    setLayout((layout as Array).filter((item) => item.i !== i));
    //setLayout({ items: _.reject(layout.items, { i: i }) });
  }

  const [selectedItems, setSelectedItems] = useState<typeof optionArray>([])
  const onSelectedItemsChange = (changes,selectedItems) => {
    //console.debug("SELECTED-OLD:", selectedItems)
    //console.debug("SELECTED-NEW:", changes.selectedItems)
    const selectedIds = changes.selectedItems.map((item) => item.value)
    const layoutIds = layout.map((l) => l.i)
    //console.debug("S-ids",selectedIds)
    //console.debug("L-ids",layoutIds)
    var id
    for (id of selectedIds) {
      if (!layoutIds.includes(id))
      {
        //console.debug("NOT-INCLUDED:",id)
        onAddItem(id)
      }
    }
    if (changes.selectedItems) {
      setSelectedItems(changes.selectedItems)
      // setFilter({ ...filter, [listName]: changes.selectedItems.map((item) => item.value) })
    }
  }

  const onRestart = () => {
    setSelectedItems([])
    setLayout([])
  }

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal} size="full" >
        <ModalOverlay  />
        <ModalContent height="70%">
          <ModalHeader>
            <Button onClick={onRestart} size="xs" variant="outline">
              Очистить
            </Button>
    <SelectId options={options}
              selectedItems={selectedItems}
              onSelectedItemsChange={onSelectedItemsChange} />
    </ModalHeader>
    <ModalCloseButton />
    <Scrollbars>
      <ModalBody>
        <TextGrid
          options={options}
          layout={layout}
          onClose={onCloseModal}
          onLayoutChange={onLayoutChange}
          onRemoveItem={onRemoveItem}
          {...props}
        />
      </ModalBody>
    </Scrollbars>
    </ModalContent>
    </Modal>
    </>
  )
}

export default TModal
