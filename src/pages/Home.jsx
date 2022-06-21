import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryId, setSort } from "../redux/slices/filterSlice";

function Home() {
  const url = "https://5970c13810cdc70011cfc08e.mockapi.io/items?";
  const categoryId = useSelector((state) => state.filters.categoryId);
  // const searchValue = useSelector((state) => state.filters.searchValue);
  const sort = useSelector((state) => state.filters.sort);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoadind, setIsLoadind] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoadind(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    fetch(
      `${url}page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoadind(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort value={sort} onChangeSort={(id) => dispatch(setSort(id))} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoadind
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => <PizzaBlock pizza={item} key={item.id} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => setCurrentPage(number)}
      />
    </div>
  );
}

export default Home;
