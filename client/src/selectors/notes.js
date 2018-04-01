export default (notes, selectors) => notes
  .filter(note => {
    const { text } = selectors;
    const { title } = note;
    const textmatch = title.toLowerCase().includes(text.toLowerCase());
    return textmatch;
  })
  .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
