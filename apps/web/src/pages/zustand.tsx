import { Button } from '@/components/button';
import { useStore } from '@/store';

const Zustand = () => {
  const bears = useStore.use.bears();
  const addBear = useStore.use.addBear();

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold">Zustand example</h2>
      bears: {bears}
      <Button onClick={addBear}>add bear</Button>
    </div>
  );
};

export default Zustand;
