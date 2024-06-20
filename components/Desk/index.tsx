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
import ReconnectingWebSocket from 'reconnecting-websocket'

import { OrgRoamNode } from '../../api'
import { LayoutContext, Layout, LayoutItem } from '../../util/layoutcontext'
import { NodeById, NodeByCite, LinksByNodeId } from '../../pages/index'
import DeskGrid from './DeskGrid'
import { SelectNodes, SelectNodesProps } from './SelectNodes'

export interface DeskProps {
  nodeById: NodeById
  nodeByCite: NodeByCite
  linksByNodeId: LinksByNodeId
  isOpenDesk: boolean
  onOpenDesk: any
  onCloseDesk: any
  selectedItems: Item[]
  setSelectedItems: any
  setPreviewNode: any
  setSidebarHighlightedNode: any
  macros?: { [key: string]: string }
  attachDir: string
  useInheritance: boolean
  windowWidth: number
  webSocket: any
}

function Desk(props: DeskProps) {
  const {
    nodeById,
    nodeByCite,
    linksByNodeId,
    isOpenDesk,
    onOpenDesk,
    onCloseDesk,
    selectedItems,
    setSelectedItems,
    setPreviewNode,
    setSidebarHighlightedNode,
    macros,
    attachDir,
    useInheritance,
    windowWidth,
    webSocket,
  } = props

  const { layout, setLayout } = useContext(LayoutContext);
  
  function onAddDeskCard (id: string, layout: Layout): boolean {
    /*eslint no-console: 0*/
    // Add a new item. It must have a unique key!
    if (layout.find((l: LayoutItem) => l.i == id) === undefined) {
      setLayout(layout.concat({
          i: id,
          x: 0,  //(layout.length * 12) % 48,
          y: Infinity, // puts it at the bottom
          w: 12,
          h: 4
        }));
      return true;
    } else {
      return false;
    }
  }

  const onLayoutChange = (layout: Layout) => {
    //this.props.onLayoutChange(layout);
    setLayout(layout);
  }

  const onCloseDeskCard = (i: string) => {
    setLayout(layout.filter((item: LayoutItem) => item.i !== i));
    setSelectedItems(selectedItems.filter((item: Item) => item.value !== i))
  }

  const onSelectedItemsChange = (changes: any,selectedItems: Item[]) => {
    switch(changes.type) {
      case "__function_remove_selected_item__":
        for (let id of selectedItems) {
          if (!changes.selectedItems.includes(id))
          {
            onCloseDeskCard(id.value)
          }
        }
        break;
      case "__function_add_selected_item__":
        for (let id of changes.selectedItems) {
          if (!selectedItems.includes(id))
          {
            onAddDeskCard(id.value,layout)
          }
        }
        break;
    }
    if (changes.selectedItems) {
      setSelectedItems(changes.selectedItems)
    }
  }

  const onRestart = () => {
    setSelectedItems([])
    setLayout([])
  }

  return (
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
            <DeskGrid
              {...props}
              onAddDeskCard={onAddDeskCard}
              onLayoutChange={onLayoutChange}
              onCloseDeskCard={onCloseDeskCard}
            />
          </ModalBody>
        </Scrollbars>
      </ModalContent>
    </Modal>
  )
}

export default Desk
