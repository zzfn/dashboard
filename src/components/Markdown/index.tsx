import 'bytemd/dist/index.min.css';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';

const plugins = [
  gfm(),
  // Add more plugins here
];

const Markdown: ({ value, onChange }: { value?: any; onChange?: any }) => JSX.Element = ({
  value = '',
  onChange,
}): JSX.Element => {
  return <Editor mode={'tab'} value={value} onChange={(val) => onChange(val)} plugins={plugins} />;
};
export default Markdown;
