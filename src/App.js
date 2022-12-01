import React, { useState } from "react";
import Form from "./components/form";
import ShopsList from "./components/ShopsList";
import { Routes, Route } from "react-router-dom";
import { getData } from "./dummyData";

function App() {
  const [data, setData] = useState(getData());

  const handleAdd = (shop) => {
    const shops = [...data];
    const id = shops.length + 1;
    shops.push({ id, ...shop });
    setData(shops);
  };

  const handleUpdate = (shop) => {
    const shops = [...data];
    const index = shops.findIndex((sh) => sh.id === shop.id);
    shops[index] = { ...shop };
    setData(shops);
  };

  const handleDelete = (id) => {
    const shops = data.filter((shop) => shop.id !== id);
    setData(shops);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path={"/shop/:id"}
          element={
            <Form
              data={data}
              handleAdd={handleAdd}
              handleUpdate={handleUpdate}
            />
          }
        />
        <Route
          path={"/"}
          element={
            <ShopsList
              data={data}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
