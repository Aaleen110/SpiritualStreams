
import { useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('Hello, React!');

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#D77B1E] mb-4">{greeting}</h1>
        <p className="text-zinc-400">Welcome to SpiritualStreams</p>
      </div>
    </div>
  );
}

export default App;
