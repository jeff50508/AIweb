import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

export default function BasicDemo({ selectedStock, setSelectedStock }: { selectedStock: City | null, setSelectedStock: React.Dispatch<React.SetStateAction<City | null>> }) {
    const [value, setValue] = useState<string>('');

    return (
        <div className="card flex justify-content-center">
            <InputText value={selectedStock} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedStock(e.target.value)} />
        </div>
    )
}
        