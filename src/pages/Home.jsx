import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import { Pagination } from "../components/Pagination";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

function Home() {
  const url = "https://5970c13810cdc70011cfc08e.mockapi.io/items?";
  const categoryId = useSelector((state) => state.filters.categoryId);
  const searchValue = useSelector((state) => state.filters.searchValue);
  const currentPage = useSelector((state) => state.filters.currentPage);
  const sortType = useSelector((state) => state.filters.sort.sortProperty);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    fetch(
      `${url}page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => <PizzaBlock pizza={item} key={item.id} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
}

export default Home;
