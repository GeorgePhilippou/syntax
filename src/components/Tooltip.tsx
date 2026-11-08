import {useEffect, useRef, useState} from 'react';

type Tip = {term: string; text: string; x: number; y: number; below: boolean};

// One shared tooltip for every [data-tip] element (glossary terms in code).
export function Tooltip() {
  const [tip, setTip] = useState<Tip | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const current = useRef<Element | null>(null);

  useEffect(() => {
    function show(target: Element) {
      const rect = target.getBoundingClientRect();
      const below = rect.top < 110;
      setTip({
        term: target.getAttribute('data-term') ?? '',
        text: target.getAttribute('data-tip') ?? '',
        x: rect.left + rect.width / 2,
        y: below ? rect.bottom + 8 : rect.top - 8,
        below,
      });
    }
    function over(event: MouseEvent) {
      const target = (event.target as Element).closest?.('[data-tip]');
      if (target === current.current) return;
      current.current = target;
      if (target) show(target);
      else setTip(null);
    }
    function hide() { current.current = null; setTip(null); }
    document.addEventListener('mouseover', over);
    document.addEventListener('mousemove', over, {passive: true});
    window.addEventListener('scroll', hide, {passive: true});
    window.addEventListener('blur', hide);
    return () => {
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mousemove', over);
      window.removeEventListener('scroll', hide);
      window.removeEventListener('blur', hide);
    };
  }, []);

  // Keep the box inside the window horizontally.
  useEffect(() => {
    const el = box.current;
    if (!el || !tip) return;
    const half = el.offsetWidth / 2;
    const x = Math.min(Math.max(tip.x, half + 8), window.innerWidth - half - 8);
    el.style.left = `${x}px`;
  }, [tip]);

  if (!tip) return null;
  return (
    <div
      ref={box}
      className={`tooltip${tip.below ? ' below' : ''}`}
      role="tooltip"
      style={{left: tip.x, top: tip.y}}
    >
      <code>{tip.term}</code>
      <span>{tip.text}</span>
    </div>
  );
}
