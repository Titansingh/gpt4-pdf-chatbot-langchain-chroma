import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import PdfListView from './sections/pdfListView';
import PdfViewerView from './sections/PdfViewerView';
import ChatView from './sections/ChatView';




function HomeScreen(): JSX.Element {





  return (
    <div className="w-full h-[90vh]">
      <PanelGroup className="flex-grow" direction="horizontal">
        <Panel defaultSize={17} minSize={15} maxSize={20}>
          <PdfListView />
        </Panel>
        <PanelResizeHandle className=" max-w-[1px] w-[1px] bg-black " />
        <Panel minSize={30}>
          <PdfViewerView />
        </Panel>
        <PanelResizeHandle className=" max-w-[1px] w-[1px] bg-black " />
        <Panel defaultSize={30} minSize={30} maxSize={50}>
          <ChatView />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default HomeScreen;
