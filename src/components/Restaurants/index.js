import React, { useState, useEffect } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  Header,
  Title,
  RestaurantList,
  Item,
  ItemImage,
  ItemInfo,
  ItemTitle,
  ItemDescription,
  Star,
  Categories,
  Distance,
  Delay,
} from './styles';

import api from '../../services/api';

export default function Restaurants({ title, display }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function loadRestaurants() {
      const response = await api.get('restaurants');

      setRestaurants(response.data);
    }
    loadRestaurants();
  }, []);

  return (
    <Container>
      <Header display={display}>
        <Title>Restaurantes</Title>
      </Header>
      
      <RestaurantList>
        {restaurants.map(item => (
          <Item>
            <ItemImage source={{ uri: item.restaurant_url }} />
            <ItemInfo>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>
                <MaterialIcons name="star" size={20} color="#FF6666" />
                <Star>{ item.star ? item.star : 'Novo!' }</Star>
                <Distance>{item.distance}</Distance>
              </ItemDescription>
              <Delay>{item.time}</Delay>
            </ItemInfo>
          </Item>
        ))}
      </RestaurantList>
    </Container>
  );
}
