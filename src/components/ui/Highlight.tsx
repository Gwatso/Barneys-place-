/** Renders `text`, colouring the first occurrence of `word` with an ink class. */
export function Highlight({ text, word, className = "ink-berry" }: { text: string; word?: string; className?: string }) {
  if (!word) return <>{text}</>;
  const index = text.indexOf(word);
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <span className={className}>{word}</span>
      {text.slice(index + word.length)}
    </>
  );
}
