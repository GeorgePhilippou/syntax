import {useEffect, useRef, useState} from 'react';
import {Check, Copy} from 'lucide-react';
import type {CodeBlock as Block} from '../content/parse.ts';
import {highlight} from '../lib/highlight.ts';

type Props = {block: Block; onCopied: (message: string) => void};

export function CodeBlock({block, onCopied}: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(block.code);
      setCopied(true);
      onCopied('Copied to clipboard');
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      onCopied('Copy unavailable — select the code instead');
    }
  }

  return (
    <div className="code">
      {block.caption && <div className="code-caption">{block.caption}</div>}
      <button className="copy" onClick={copy} aria-label="Copy code" title="Copy">
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre tabIndex={0}>
        <code dangerouslySetInnerHTML={{__html: highlight(block.code, block.lang)}} />
      </pre>
    </div>
  );
}
