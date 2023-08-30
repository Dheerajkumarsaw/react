import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false }
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackagingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItems={handleToggleItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <>
      <h3>What do you need for your 😍 trip ?</h3>
      <form className="add-form" onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option values={num}>{num}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </>
  );
}

function PackagingList({ items, onDeleteItems, onToggleItems }) {
  return items.length === 0 ? (
    <h3> Please add some item to your list</h3>
  ) : (
    <ul className="list">
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={onDeleteItems}
          onToggleItem={onToggleItems}
        />
      ))}
    </ul>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);
  console.log(numItems, packedItems);
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

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onClick={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
