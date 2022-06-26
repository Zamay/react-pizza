import { useNavigate, useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { PizzaBlock } from '../components/PizzaBlock';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<PizzaBlockProps>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://626d16545267c14d5677d9c2.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
  }

  return <PizzaBlock {...pizza} />;
};

export default FullPizza;
