
 export function Stats({ items }) {
    const numItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const percentage = Math.round((packedItems / numItems) * 100);
    return (
      <footer className="stats">
        {numItems === 0 ? (
          <em>💼 You have {numItems} items on your list </em>
        ) : (
          <em>
            💼 You have {numItems} items on your list, and you already packed{" "}
            {packedItems} ({packedItems === 0 ? "0%" : ` ${percentage}%`}){" "}
          </em>
        )}
      </footer>
    );
  }