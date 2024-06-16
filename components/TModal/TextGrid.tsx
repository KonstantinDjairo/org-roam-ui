import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  IconButton
} from '@chakra-ui/react';
import GridLayout from "react-grid-layout";
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
import { openNodeInEmacs } from '../../util/webSocketFunctions'
import { usePersistantState } from '../../util/persistant-state'
import { Note } from '../Sidebar/Note'
import { Title } from '../Sidebar/Title'

export default function TextGrid (props) {
  //console.log("TextGrid:PROPS",props);
  const {
    //options,
    layout,
    onLayoutChange,
    onRemoveItem,
    onClose,
    setPreviewNode,
    previewNode,
    nodeById,
    nodeByCite,
    setSidebarHighlightedNode,
    linksByNodeId,
    openContextMenu,
    macros,
    attachDir,
    useInheritance,
    windowWidth,
    webSocket
  } = props;
  //console.log("TextGrid:NodeById",nodeById);
  //const [ layout, setLayout ] = useState<Layout>([]);
  //const [ counter, setCounter ] = useState(0);
  const [justification, setJustification] = usePersistantState('justification', 1)
  const [outline, setOutline] = usePersistantState('outline', false)
  const justificationList = ['justify', 'start', 'end', 'center']
  //const [font, setFont] = useState('sans serif')
  //const [indent, setIndent] = useState(0)
  const [collapse, setCollapse] = useState(false)

  const createElement = (el) => {
    const i = el.i;
    //function onRemoveItemi() {console.log("REMOVEi-",i); onRemoveItem(i)};
    
    return (
      <Box key={i} data-grid={el}
           className="card"
           p={2}
           pr={0}
           bg="white"
           borderWidth='1px'
           boxShadow="lg"
      >
        <Scrollbars>
          <Flex mr={3} >
            <Title previewNode={nodeById[i]} />
            <Spacer />
            <IconButton
              className="nodrag"
              variant="subtle"
              size="xs"
              icon={<EditIcon />}
              onClick={() => openNodeInEmacs(nodeById[i] as OrgRoamNode, webSocket)}
            />
            <IconButton
              className="nodrag"
              variant="subtle"
              size="xs"
              icon={<CloseIcon />}
              onClick={() => onRemoveItem(i)}
            />
          </Flex>
          <Note
            setPreviewNode={setPreviewNode}
            justificationList={justificationList}
            justification={justification}
            previewNode={nodeById[i]} 
            nodeById={nodeById}
            nodeByCite={nodeByCite}
            setSidebarHighlightedNode={setSidebarHighlightedNode}
            linksByNodeId={linksByNodeId}
            openContextMenu={openContextMenu}
            outline={outline}
            collapse={collapse}
            macros={macros}
            attachDir={attachDir}
            useInheritance={useInheritance}
          />
        </Scrollbars>
      </Box>
    );
  }

  return (
    <>
      <GridLayout
        layout={layout}
        cols={12}
        rowHeight={300}
        width={windowWidth - 50}
        containerPadding={[20,20]}
        //compactType={null}
        isDroppable={true}
        onLayoutChange={onLayoutChange}
        resizeHandles={['s','n','e','w','sw','nw','se','ne']}
        draggableCancel=".nodrag"
        {...props}
      >
        {layout.map(el => createElement(el))}
      </GridLayout>
    </>
  );
};
