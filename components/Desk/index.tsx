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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
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
import { SelectNodes, SelectNodesProps } from './SelectNodes'

function Desk(props) {
  const nodes = Object.values(props.nodeById)
  const {
    isOpenModal,
    onOpenModal,
    onCloseModal,
    layout,
    setLayout,
    selectedItems,
    setSelectedItems,
    setPreviewNode,
  } = props
  //const { isOpen, onOpen, onClose } = useDisclosure()

  const onAddItem = (id) => {
    /*eslint no-console: 0*/
    setLayout(
      // Add a new item. It must have a unique key!
      (layout as Array).concat({
        i: id,
        x: (layout.length * 12) % (props.cols || 48),
        y: Infinity, // puts it at the bottom
        w: 12,
        h: 4
      }),
    );
  }

  const onLayoutChange = (layout) => {
    //this.props.onLayoutChange(layout);
    setLayout(layout);
  }

  const onCloseNode = (i) => {
    setLayout((layout as Array).filter((item) => item.i !== i));
    //setLayout({ items: _.reject(layout.items, { i: i }) });
  }

  const onSelectedItemsChange = (changes,selectedItems) => {
    //console.log("OLD-SEL-ITEMS:",selectedItems)
    //console.log("NEW-SEL-ITEMS:",changes,changes.selectedItems)
    const oldIds = selectedItems.map((item) => item.value)
    const newIds = changes.selectedItems.map((item) => item.value)
    //const layoutIds = layout.map((l) => l.i)
    switch(changes.type) {
      case "__function_remove_selected_item__":
        console.log("remove item");
        for (let id of oldIds) {
          if (!newIds.includes(id))
          {
            onCloseNode(id)
          }
        }
        break;
      case "__function_add_selected_item__":
        console.log("add item");
        for (let id of newIds) {
          if (!oldIds.includes(id))
          {
            onAddItem(id)
          }
        }
        break;
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

  const setAddPreviewNode = (node) => {
    onAddItem(node.id);
    setPreviewNode(node);
  }
      
  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal} size="full" >
        <ModalOverlay  />
        <ModalContent height="70%">
          <Accordion allowToggle defaultIndex={[0]} ml={2} w="95%" borderWidth={1}>
            <AccordionItem mt={0}>
              <AccordionButton _expanded={{ bg: 'gray.100' }}>
                <Box as='span' flex='1' textAlign='left'>Tools</Box>
    <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      <Button onClick={onRestart} size="xs" variant="outline">
        Очистить
      </Button>
      <SelectNodes nodes={nodes}
                   selectedItems={selectedItems}
                   onSelectedItemsChange={onSelectedItemsChange} />
    </AccordionPanel>
    </AccordionItem>
    </Accordion>
    <ModalCloseButton />
    <Scrollbars>
      <ModalBody>
        <TextGrid
          {...props}
          //nodes={nodes}
          layout={layout}
          onClose={onCloseModal}
          onLayoutChange={onLayoutChange}
          onCloseNode={onCloseNode}
          setPreviewNode={setAddPreviewNode}
        />
      </ModalBody>
    </Scrollbars>
    </ModalContent>
    </Modal>
    </>
  )
}

export default Desk
