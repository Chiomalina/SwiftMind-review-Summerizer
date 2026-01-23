import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      async function loadData() {
         try {
            const res = await fetch('/api/hello');
            if (!res.ok) return;

            const data = await res.text();
            setMessage(data);
         } catch (err) {
            console.error(err);
         }
      }

      loadData();
   }, []);
   return (
      <div className="ml-3">
         <p className="p-8 bg-red-500 text-white text-5xl">{message}</p>
         <Button>Button</Button>
      </div>
   );
}

export default App;
