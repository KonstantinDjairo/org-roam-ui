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

function TModal(props) {
  const options = Object.values(props.nodeById)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Tooltip label={isOpen ? 'Close modal' : 'Open modal'}>
        <IconButton
          m={1}
          // eslint-disable-next-line react/jsx-no-undef
          icon={<BsBack />}
          aria-label="Close modal view"
          variant="subtle"
          onClick={isOpen ? onClose : onOpen}
        />
      </Tooltip>
    <Modal isOpen={isOpen} onClose={onClose} size="full" scrollBehavior="outside" >
      <ModalOverlay  />
      <ModalContent height="70%">
        <ModalCloseButton />
        <Scrollbars>
          <ModalBody>
            <TextGrid options={options} onClose={onClose} {...props} />
          </ModalBody>
        </Scrollbars>
        
        <ModalFooter>
          <Button onClick={onClose} variant="outline">Закрыть</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}

export default TModal
