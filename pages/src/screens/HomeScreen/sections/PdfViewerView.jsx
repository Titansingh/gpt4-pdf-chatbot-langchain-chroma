'use client';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { useRecoilValue } from 'recoil';
import { selectedPdfState } from '@/recoil/atom';

function PdfViewerView() {
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
  const selectedPdf = useRecoilValue(selectedPdfState);

  const transform = (slot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    EnterFullScreen: () => <></>,
    EnterFullScreenMenuItem: () => <></>,
    SwitchTheme: () => <></>,
    SwitchThemeMenuItem: () => <></>,
    Open: () => <></>,
  });
  return (
    <div className="flex flex-col items-center">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
        <div
          style={{
            alignItems: 'center',
            backgroundColor: '#eeeeee',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            padding: '0.25rem',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
        </div>
        <div
          style={{
            height: '750px',
            maxWidth: '100%',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Viewer
            fileUrl={selectedPdf.path}
            plugins={[toolbarPluginInstance]}
          />
        </div>
      </Worker>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </div>
  );
}

export default PdfViewerView;
