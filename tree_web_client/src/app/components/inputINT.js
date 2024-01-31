import React from "react";

function InputINT({ value, setValue }) {
  // Funkcja do aktualizacji stanu, wywoływana przy każdej zmianie inputa
  const handleInputChangeINT = (event) => {
    const newValue = parseInt(event.target.value, 10); // Konwersja na liczbę całkowitą
    setValue(isNaN(newValue) ? 0 : newValue); // Aktualizacja wartości, użycie 0 jeśli nie liczba
  };

  return (
    <input
      className="form-control"
      type="number"
      value={value} // Użycie wartości przekazanej jako prop
      onChange={handleInputChangeINT}
    />
  );
}

export default InputINT;
