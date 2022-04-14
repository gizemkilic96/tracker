import { useLayoutEffect , useContext, } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { GiderlerContext } from '../store/giderler-context';
import GiderForm from '../components/ManageExpense/GiderForm';
import {storeGider, updateGider,deleteGider} from '../util/http';



function GiderleriYönetme({route,navigation,}){


  const giderlerCtx = useContext(GiderlerContext);

  const editedGiderId = route.params?.giderId;
  const isEditing = !!editedGiderId;

  const selectedGider = giderlerCtx.giderler.find(
    (gider) => gider.id === editedGiderId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Gideri Düzenle' : 'Gider Ekle',
    });
  }, [navigation, isEditing]);

    async function deleteGiderHandler() {
      await deleteGider(editedGiderId);
      giderlerCtx.deleteGider(editedGiderId);
        navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

    async function confirmHandler(giderData) {
    if (isEditing) {
      giderlerCtx.updateGider(editedGiderId, giderData);
      await updateGider(editedGiderId, giderData);
    } else {
      const id =  await storeGider(giderData);
      giderlerCtx.addGider({...giderData, id:id});
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <GiderForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedGider}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteGiderHandler}
          />
        </View>
      )}
    </View>
  );
}


export default GiderleriYönetme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
     
    
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});