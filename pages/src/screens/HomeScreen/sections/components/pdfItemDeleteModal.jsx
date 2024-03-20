import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function pdfItemDeleteModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Document
            </ModalHeader>
            <ModalBody>
              {/* Add your upload form or content here */}
              <p>Are you sure you?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              {/* Add an "Upload" button or any other action buttons */}
              <Button color="primary" onPress={onClose}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
