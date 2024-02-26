import { useBalanceContext } from "@/app/context/AppContext";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";


const NewBalanceComponent: React.FC = () => {
    const [name, setName] = useState<string>('');

    const { handleAddBalance } = useBalanceContext();

    const handleAdd = () => {
        if (name.trim() !== '') {
          handleAddBalance(name.trim());
          setName('');
        }
      };

    return (
        <div className="flex gap-4">
            <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="sm"
            className="max-w-[220px]"
            type="text"
            label="Balance name"
            color="warning"
          />
          <Button onClick={handleAdd} className="p-3 font-bold text-white" size="lg" color='warning'>ADD</Button>
        </div>
    );
}

export default NewBalanceComponent;