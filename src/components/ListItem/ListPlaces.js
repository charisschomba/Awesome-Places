import React from 'react';
import {
  StyleSheet,
  FlatList,
} from 'react-native';

import ListItem from './ListItem';


const ListPlaces = ({ places, selectedItem }) => {
  return (
    <FlatList
      style={styles.listContainer}
      data={places}
      renderItem={(info) =>
        <ListItem
        onSelectedItem={() => selectedItem(info.item.key)}
        placeName={info.item.name}
        placeImage={info.item.image}
        />
      }
    />
  )
};

styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  }
});

export default ListPlaces;
