import {
  IconFileTypeCss,
  IconFileTypeHtml,
  IconFileTypeJs,
  IconFileTypeJsx,
  IconFileTypeRs,
  IconFileTypeSql,
  IconFileTypeTs,
  IconFileTypeTsx,
  IconFileTypeTxt,
  IconFileTypeVue,
} from '@tabler/icons-react';

const fileIcons = [
  {
    case: {
      fileEnding: ['.js'],
      language: ['JavaScript'],
    },
    icon: IconFileTypeJs,
  },
  {
    case: {
      fileEnding: ['.jsx'],
      language: ['JSX'],
    },
    icon: IconFileTypeJsx,
  },
  {
    case: {
      fileEnding: ['.ts'],
      language: ['TypeScript'],
    },
    icon: IconFileTypeTs,
  },
  {
    case: {
      fileEnding: ['.tsx'],
      language: ['TSX'],
    },
    icon: IconFileTypeTsx,
  },
  {
    case: {
      fileEnding: ['.css'],
      language: ['CSS'],
    },
    icon: IconFileTypeCss,
  },
  {
    case: {
      fileEnding: ['.sql'],
      language: ['SQL'],
    },
    icon: IconFileTypeSql,
  },
  {
    case: {
      fileEnding: ['.html'],
      language: ['HTML'],
    },
    icon: IconFileTypeHtml,
  },
  {
    case: {
      fileEnding: ['.vue'],
      language: ['Vue'],
    },
    icon: IconFileTypeVue,
  },
  {
    case: {
      fileEnding: ['.rs'],
      language: ['Rust'],
    },
    icon: IconFileTypeRs,
  },
  {
    case: {
      fileEnding: ['.txt'],
      language: ['Text'],
    },
    icon: IconFileTypeTxt,
  },
];
export function getFileIcon(_match: string) {
  const match = _match.toLocaleLowerCase();

  const matchingLang = fileIcons.find((icon) => {
    return (
      icon.case.fileEnding.some((s) => match.endsWith(s.toLocaleLowerCase())) ||
      icon.case.language.some((s) => match.includes(s.toLocaleLowerCase()))
    );
  });

  return matchingLang?.icon || IconFileTypeTxt;
}
