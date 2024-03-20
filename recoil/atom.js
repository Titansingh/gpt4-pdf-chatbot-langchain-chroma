import { atom } from 'recoil';

export const pdfState = atom({
  key: 'pdfState',
  default: [
    { id: 1, name: 'Guyton Physiology', path: '/Guyton Physiology.pdf' },
    {
      id: 2,
      name: 'Anatomy Trains Myofascial',
      path: '/Anatomy_Trains_Myofascial_Thomas_W_Myers.pdf',
    },
    {
      id: 3,
      name: 'Anatomy and Human Movement Structure',
      path: '/Anatomy_and_Human_Movement_Structure_and.pdf',
    },
  ],
});

export const selectedPdfState = atom({
  key: 'selectedPdfState',
  default: { id: 1, name: 'Guyton Physiology', path: '/Guyton Physiology.pdf' },
});
