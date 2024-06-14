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
  const { isOpenModal, onOpenModal, onCloseModal } = props
  //const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal} size="full" >
        <ModalOverlay  />
        <ModalContent height="70%">
          <ModalHeader>
            <Button onClick={onCloseModal} size="xs" variant="outline">Закрыть</Button>
    </ModalHeader>
    <ModalCloseButton />
    <Scrollbars>
      <ModalBody>
        <TextGrid options={options} onClose={onCloseModal} {...props} />
      </ModalBody>
    </Scrollbars>
    </ModalContent>
    </Modal>
    </>
  )
}

export default TModal
