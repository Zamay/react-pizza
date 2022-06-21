import { useEffect, useState } from "react";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

function Home() {
  const url = "https://5970c13810cdc70011cfc08e.mockapi.io/items";
  const [items, setItems] = useState([]);
  const [isLoadind, setIsLoadind] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoadind(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoadind
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => <PizzaBlock pizza={item} key={item.id} />)}
      </div>
    </div>
  );
}

export default Home;
