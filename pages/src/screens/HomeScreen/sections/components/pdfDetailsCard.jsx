/* eslint-disable react/prop-types */

import { Card, CardBody, Button } from '@nextui-org/react';
import { MdOutlineModeEdit, MdDeleteForever } from 'react-icons/md';
import { FaFilePdf } from 'react-icons/fa6';

export default function PdfDetailsCard({
  name = 'Cover_letter_generated.pdf',
  isSelected,
  openDeleteModal,
  openEditModal,
  onClick,
}) {
  return (
    <Card
      className={`max-w-[300px] mx-4 mt-2 mb-2 border ${
        isSelected ? 'border-blue-500' : 'border-gray-200'
      } rounded-lg`}
    >
      <CardBody onClick={onClick} className="flex flex-row items-center">
        <FaFilePdf className="mr-1" />
        <p className="text-sm ml-1">{name}</p>
        {/* <div className="flex justify-center items-center ">
          <Button
            isIconOnly
            variant="text"
            color="primary"
            size="mini"
            onClick={openEditModal}
          >
            <MdOutlineModeEdit />
          </Button>
          <Button
            isIconOnly
            variant="text"
            color="danger"
            size="mini"
            onClick={openDeleteModal}
          >
            <MdDeleteForever />
          </Button>
        </div> */}
      </CardBody>
    </Card>
  );
}
