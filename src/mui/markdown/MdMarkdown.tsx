import { MuiMarkdown } from 'mui-markdown';
import { useId } from 'mui/hook/useId';
import { Highlight, themes } from 'prism-react-renderer';
import { useCallback, useEffect, useRef } from 'react';

interface IMdMarkdownProps {
  content?: string;
  summaryCallback?: (summary: string) => void;
}

const MdMarkdown: React.FC<IMdMarkdownProps> = (props) => {
  const { id } = useId();
  const interval = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateSummary = useCallback((idMarkdown: string) => {
    const iddd = document.getElementById(idMarkdown);
    const div = iddd?.getElementsByTagName('div');
    let newSummary = '';
    if (div && div.length > 0) {
      interval.current && clearInterval(interval.current);
      const elements = div[0].getElementsByTagName('*');
      for (const element of elements) {
        if (element.tagName.includes('H')) {
          const number = parseInt(element.tagName.replace('H', ''));
          let tabs = '';
          for (let i = 3; i < number; i++) {
            tabs += '\t';
          }
          newSummary += tabs + '* [' + element.innerHTML + '](#' + element.id + ')\n';
        }
      }
    }
    return newSummary;
  }, []);

  useEffect(() => {
    if (props.summaryCallback) {
      interval.current && clearInterval(interval.current);
      let count = 0;
      interval.current = setInterval(() => {
        const newSummary = generateSummary(id);
        props.summaryCallback!(newSummary);
        count++;
        console.log(count);
        if (count > 10) {
          interval.current && clearInterval(interval.current);
        }
      }, 100);
    }
  }, [id, generateSummary, props.summaryCallback]);

  return (
    <div id={id}>
      <MuiMarkdown Highlight={Highlight} themes={themes} prismTheme={themes.github}>
        {props.content}
      </MuiMarkdown>
    </div>
  );
};

export default MdMarkdown;
