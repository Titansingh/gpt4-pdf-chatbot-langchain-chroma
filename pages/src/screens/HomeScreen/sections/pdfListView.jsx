import { useState } from 'react';
import PdfDetailsCard from './components/pdfDetailsCard';
import { Button } from '@nextui-org/react';
import PdfItemEditModal from './components/pdfItemEditModal';
import PdfItemDeleteModal from './components/pdfItemDeleteModal';
import { useRecoilState } from 'recoil';
import { pdfState, selectedPdfState } from '@/recoil/atom';

function PdfListView() {
  // eslint-disable-next-line no-unused-vars
  const [medicalBooks, setMedicalBooks] = useRecoilState(pdfState);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useRecoilState(selectedPdfState);

  const openEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);
  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const handleCardClick = (selectedPdf) => {
    setSelectedPdf(selectedPdf);
  };

  return (
    <div className="flex flex-col">
      {/* <Button
        className="mr-4 ml-4 mt-4 mb-2 max-w-[400px]"
        color="primary"
        variant="ghost"
      >
        Upload document
      </Button> */}
      {medicalBooks.map((item) => (
        <PdfDetailsCard
          isSelected={selectedPdf && selectedPdf.id === item.id}
          key={item.id}
          name={item.name}
          openEditModal={openEditModal}
          openDeleteModal={openDeleteModal}
          onClick={() => handleCardClick(item)}
        />
      ))}

      <PdfItemEditModal isOpen={editModal} onClose={closeEditModal} />
      <PdfItemDeleteModal isOpen={deleteModal} onClose={closeDeleteModal} />
    </div>
  );
}

export default PdfListView;
