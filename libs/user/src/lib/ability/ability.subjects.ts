import { SUBJECTS } from '../constants';

export const AbilitySubject = {
  add: (subjects: { [key: string]: string }) => {
    Object.keys(subjects).forEach((key) => {
      SUBJECTS[key] = subjects[key];
    });
  },

  list: () => {
    const result: { [key: string]: string } = {};
    Object.keys(SUBJECTS).forEach((key) => {
      if (typeof SUBJECTS[key] === 'function') return;
      result[key] = SUBJECTS[key];
    });
    return result;
  },
};
