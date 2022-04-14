import { View,StyleSheet ,Text} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

import GiderlerListesi from './GiderlerListesi';
import GiderlerÖzeti from './GiderlerÖzeti';

function GiderlerCikti({ giderler, giderlerPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (giderler.length > 0) {
    content = <GiderlerListesi giderler={giderler} />;
  }

  return (
    <View style={styles.container}>
      <GiderlerÖzeti giderler={giderler} periodName={giderlerPeriod} />
      {content}
    </View>
  );
}

export default GiderlerCikti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});