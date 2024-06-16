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
import { SelectId, SelectIdProps } from './SelectId'

function TModal(props) {
  const options = Object.values(props.nodeById)
  const {
    isOpenModal,
    onOpenModal,
    onCloseModal,
    setPreviewNode,
  } = props
  //const { isOpen, onOpen, onClose } = useDisclosure()
  const [ layout, setLayout ] = useState<Layout>([]);

  const onAddItem = (id) => {
    /*eslint no-console: 0*/
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
    //this.props.onLayoutChange(layout);
    setLayout(layout);
  }

  const onRemoveItem = (i) => {
    setLayout((layout as Array).filter((item) => item.i !== i));
    //setLayout({ items: _.reject(layout.items, { i: i }) });
  }

  const [selectedItems, setSelectedItems] = useState<typeof optionArray>([])
  const onSelectedItemsChange = (changes,selectedItems) => {
    const selectedIds = changes.selectedItems.map((item) => item.value)
    const layoutIds = layout.map((l) => l.i)
    var id
    for (id of selectedIds) {
      if (!layoutIds.includes(id))
      {
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
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>Tools</Box>
    <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      <Button onClick={onRestart} size="xs" variant="outline">
        Очистить
      </Button>
      <SelectId options={options}
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
          options={options}
          layout={layout}
          onClose={onCloseModal}
          onLayoutChange={onLayoutChange}
          onRemoveItem={onRemoveItem}
          setPreviewNode={setAddPreviewNode}
        />
      </ModalBody>
    </Scrollbars>
    </ModalContent>
    </Modal>
    </>
  )
}

export default TModal
