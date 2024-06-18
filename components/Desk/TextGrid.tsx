import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  IconButton
} from '@chakra-ui/react';
import ReactGridLayout from "react-grid-layout";
import { Layout, LayoutItem } from '../../pages'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {
  EditIcon,
  CloseIcon,
  ViewIcon,
  ExternalLinkIcon,
  ChevronRightIcon,
  PlusSquareIcon,
  MinusIcon,
} from '@chakra-ui/icons'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import ReconnectingWebSocket from 'reconnecting-websocket'

import { OrgRoamNode } from '../../api'
//import { openNodeInEmacs } from '../../util/webSocketFunctions'
import { usePersistantState } from '../../util/persistant-state'
import { NodeById, NodeByCite, LinksByNodeId } from '../../pages/index'
import GridNote from './GridNote'
import { Note } from '../Sidebar/Note'
import { Title } from '../Sidebar/Title'

export interface TextGridProps {
  layout: Layout
  onLayoutChange: any
  onCloseNode: any
  onClose: any
  setPreviewNode: any
  //previewNode: OrgRoamNode
  nodeById: NodeById
  nodeByCite: NodeByCite
  setSidebarHighlightedNode: any
  linksByNodeId: LinksByNodeId
  //openContextMenu: any
  macros?: { [key: string]: string }
  attachDir: string
  useInheritance: boolean
  windowWidth: number
  webSocket: any
}

export default function TextGrid (props: TextGridProps) {
  const {
    layout,
    onLayoutChange,
    onCloseNode,
    onClose,
    setPreviewNode,
    //previewNode,
    nodeById,
    nodeByCite,
    setSidebarHighlightedNode,
    linksByNodeId,
    //openContextMenu,
    macros,
    attachDir,
    useInheritance,
    windowWidth,
    webSocket
  } = props;
  const [justification, setJustification] = usePersistantState('justification', 1)
  const [outline, setOutline] = usePersistantState('outline', false)
  const justificationList = ['justify', 'start', 'end', 'center']
  //const [font, setFont] = useState('sans serif')
  //const [indent, setIndent] = useState(0)
  const [collapse, setCollapse] = useState(false)

  const createElement = (el: LayoutItem) => {
    const i = el.i;
    
    return (
      <Box key={i} data-grid={el}
           className="card"
           p={2}
           pr={0}
           bg="white"
           borderWidth='1px'
           boxShadow="lg"
      >
        <GridNote
          previewNodeId={i}
          setPreviewNode={setPreviewNode}
          nodeById={nodeById}
          nodeByCite={nodeByCite}
          linksByNodeId={linksByNodeId}
          setSidebarHighlightedNode={setSidebarHighlightedNode}
          //openNodeInEmacs={openNodeInEmacs}
          onCloseNode={onCloseNode}
          macros={macros}
          attachDir={attachDir}
          useInheritance={useInheritance}
          webSocket={webSocket}
        />
      </Box>
    );
  }

  return (
    <>
      <ReactGridLayout
        //layout={layout}
        cols={48}
        rowHeight={100}
        width={windowWidth - 50}
        containerPadding={[20,20]}
        //compactType={null}
        isDroppable={true}
        //onLayoutChange={onLayoutChange}
        resizeHandles={['s','n','e','w','sw','nw','se','ne']}
        draggableCancel=".nodrag"
        allowOverlap={true}
        {...props}
      >
        {layout.map((el) => createElement(el))}
      </ReactGridLayout>
    </>
  );
};
