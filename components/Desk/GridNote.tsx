import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  IconButton
} from '@chakra-ui/react';
//import GridLayout, { Layout, LayoutItem } from "react-grid-layout";
import { NodeObject } from "force-graph";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {
  EditIcon,
  CloseIcon,
} from '@chakra-ui/icons'
import { BiDotsVerticalRounded } from 'react-icons/bi'
//import ReconnectingWebSocket from 'reconnecting-websocket'

import { OrgRoamNode } from '../../api'
import { openNodeInEmacs } from '../../util/webSocketFunctions'
//import { usePersistantState } from '../../util/persistant-state'
import { NodeById, NodeByCite, LinksByNodeId } from '../../pages/index'
import { Note } from '../Sidebar/Note'
import { Title } from '../Sidebar/Title'

export interface GridNoteProps {
  previewNodeId: string
  setPreviewNode: any
  nodeById: NodeById
  nodeByCite: NodeByCite
  linksByNodeId: LinksByNodeId
  setSidebarHighlightedNode: any
  onCloseNode: any
  macros?: { [key: string]: string }
  attachDir: string
  useInheritance: boolean
  webSocket: any
}

export default function GridNote (props: GridNoteProps) {
  //const [previewNode, setPreviewNode] = useState<OrgRoamNode>({})

  const {
    previewNodeId,
    setPreviewNode,
    nodeById,
    nodeByCite,
    linksByNodeId,
    setSidebarHighlightedNode,
    onCloseNode,
    macros,
    attachDir,
    useInheritance,
    webSocket,
  } = props;

  const previewNode = nodeById[previewNodeId]
  
  return (
    <Scrollbars>
      <Flex mr={3} >
        <Title previewNode={previewNode} />
        <Spacer />
        <IconButton
          className="nodrag"
          variant="subtle"
          aria-label="Edit"
          size="xs"
          icon={<EditIcon />}
          onClick={() => openNodeInEmacs(previewNode as OrgRoamNode, webSocket)}
        />
        <IconButton
          className="nodrag"
          variant="subtle"
          aria-label="Close"
          size="xs"
          icon={<CloseIcon />}
          onClick={() => onCloseNode(previewNodeId)}
        />
      </Flex>
      <Note
        previewNode={previewNode as NodeObject} 
        setPreviewNode={setPreviewNode}
        justificationList={["left"]}
        justification={0}
        nodeById={nodeById}
        nodeByCite={nodeByCite}
        setSidebarHighlightedNode={setSidebarHighlightedNode}
        linksByNodeId={linksByNodeId}
        openContextMenu={null}
        outline={false}
        collapse={false}
        macros={macros}
        attachDir={attachDir}
        useInheritance={useInheritance}
      />
    </Scrollbars>
  )
}
