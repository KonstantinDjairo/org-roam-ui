import React, { useContext } from 'react'
import { NodeObject } from 'force-graph'

import { NodeById, NodeByCite, LinksByNodeId } from '../../pages'
import { Box, Flex } from '@chakra-ui/react'
import { UniOrg } from '../../util/uniorg'
import { LayoutContext } from '../../util/layoutcontext'
import { Backlinks } from '../../components/Sidebar/Backlinks'
import { defaultNoteStyle, viewerNoteStyle, outlineNoteStyle } from './noteStyle'
import { OrgRoamLink } from '../../api'

export interface NoteProps {
  setPreviewNode: any
  //onLinkClick: any
  isDesk: boolean
  onAddDeskCard: any
  previewNode: NodeObject
  nodeById: NodeById
  nodeByCite: NodeByCite
  setSidebarHighlightedNode: any
  justification: number
  justificationList: string[]
  linksByNodeId: LinksByNodeId
  openContextMenu: any
  outline: boolean
  collapse: boolean
  macros?: { [key: string]: string }
  attachDir: string
  useInheritance: boolean
}

export const Note = (props: NoteProps) => {
  const {
    setPreviewNode,
    //onLinkClick,
    isDesk,
    onAddDeskCard,
    justificationList,
    justification,
    previewNode,
    nodeById,
    nodeByCite,
    setSidebarHighlightedNode,
    linksByNodeId,
    openContextMenu,
    outline,
    collapse,
    macros,
    attachDir,
    useInheritance,
  } = props
  const { layout } = useContext(LayoutContext)

  const extraStyle = outline ? outlineNoteStyle : viewerNoteStyle
  //console.log("NOTE: %s\n    : %s",previewNode.id,previewNode.title)
  //console.log("== Note == %s\n   layout: %s\n   onAdddeskcard: ",
  //            previewNode.title,layout,onAddDeskCard)
  return (
    <Box
      pr={8}
      pt={2}
      height="100%"
      className="org"
      sx={{
        ...defaultNoteStyle,
        ...extraStyle,
        textAlign: justificationList[justification],
      }}
    >
      {previewNode?.id && (
        <Flex
          className="wrapClass"
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <UniOrg
            {...{
              setPreviewNode,
              //onLinkClick,
              isDesk,
              onAddDeskCard,
              previewNode,
              nodeByCite,
              setSidebarHighlightedNode,
              openContextMenu,
              outline,
              collapse,
              nodeById,
              linksByNodeId,
              macros,
              attachDir,
              useInheritance,
            }}
          />
          <Backlinks
            {...{
              setPreviewNode,
              //onLinkClick,
              isDesk,
              onAddDeskCard,
              previewNode,
              nodeById,
              linksByNodeId,
              nodeByCite,
              setSidebarHighlightedNode,
              openContextMenu,
              outline,
              attachDir,
              useInheritance,
            }}
            macros={macros || {}}
          />
        </Flex>
      )}
    </Box>
  )
}
