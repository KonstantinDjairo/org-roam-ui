'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'

//import Image from "next/image";
import {
  VStack,
  Flex,
  Box,
  IconButton,
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
import { Scrollbars } from 'react-custom-scrollbars-2'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons'
import { Item } from 'chakra-ui-autocomplete'
import { BsBack } from 'react-icons/bs'
import { BiDotsVerticalRounded, BiFile, BiNetworkChart } from 'react-icons/bi'
import { Layout } from "react-grid-layout";

import { OrgRoamNode } from '../../api'
import TextGrid from './TextGrid'
import { SelectNodes, SelectNodesProps } from './SelectNodes'
import { NodeById, NodeByCite, LinksByNodeId } from '../../pages/index'

export interface DeskProps {
  nodeById: NodeById
  nodeByCite: NodeByCite
  linksByNodeId: LinksByNodeId
  isOpenDesk: boolean
  onOpenDesk: any
  onCloseDesk: any
  layout: Layout[]
  setLayout: any
  selectedItems: Item[]
  setSelectedItems: any
  setPreviewNode: any
  setSidebarHighlightedNode: any
}

function Desk(props: DeskProps) {
  //const nodes = Object.values(props.nodeById)
  //console.log("NODES:",(typeof nodes),nodes)
  const {
    nodeById,
    nodeByCite,
    linksByNodeId,
    isOpenDesk,
    onOpenDesk,
    onCloseDesk,
    layout,
    setLayout,
    selectedItems,
    setSelectedItems,
    setPreviewNode,
    setSidebarHighlightedNode,
  } = props

  const onAddItem = (id: string) => {
    /*eslint no-console: 0*/
    setLayout(
      // Add a new item. It must have a unique key!
      layout.concat({
        i: id,
        x: (layout.length * 12) % 48,
        y: Infinity, // puts it at the bottom
        w: 12,
        h: 4
      }),
    );
  }

  const onLayoutChange = (layout: Layout[]) => {
    //this.props.onLayoutChange(layout);
    setLayout(layout);
  }

  const onCloseNode = (i: string) => {
    setLayout(layout.filter((item: Layout) => item.i !== i));
    setSelectedItems(selectedItems.filter((item: Item) => item.value !== i))
    //setLayout({ items: _.reject(layout.items, { i: i }) });
  }

  const onSelectedItemsChange = (changes: any,selectedItems: Item[]) => {
    switch(changes.type) {
      case "__function_remove_selected_item__":
        for (let id of selectedItems) {
          if (!changes.selectedItems.includes(id))
          {
            onCloseNode(id.value)
          }
        }
        break;
      case "__function_add_selected_item__":
        for (let id of changes.selectedItems) {
          if (!selectedItems.includes(id))
          {
            onAddItem(id.value)
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

  const setAddPreviewNode = (node: OrgRoamNode) => {
    onAddItem(node.id);
    setPreviewNode(node);
  }
      
  return (
    <>
      <Modal isOpen={isOpenDesk} onClose={onCloseDesk} size="full" >
        <ModalOverlay  />
        <ModalContent height="70%">
          <Accordion allowToggle defaultIndex={[0]} ml={2} w="95%" borderWidth={1}>
            <AccordionItem mt={0}>
              <AccordionButton _expanded={{ bg: 'gray.100' }}>
                <Box as='span' flex='1' textAlign='left'>Управление</Box>
    <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      <Button onClick={onRestart} size="xs" variant="outline">
        Очистить
      </Button>
      <SelectNodes nodeById={nodeById}
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
          onClose={onCloseDesk}
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
