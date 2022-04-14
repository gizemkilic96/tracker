import { FlatList } from 'react-native';

import GiderItem from './GiderItem';


function renderGiderItem(itemData) {
  return <GiderItem {...itemData.item} />;
}

function GiderlerListesi({ giderler }) {
  return (
    <FlatList
      data={giderler}
      renderItem={renderGiderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default GiderlerListesi;