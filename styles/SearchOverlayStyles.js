import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
    width: '100%'
  },
  searchOverlayModal: {
    top: 0,
    left: 0,
    backgroundColor: 'white',
    position: 'absolute',
    width: '70%',
    height: '100%',
  },
  closeModalView: {
    alignSelf: 'flex-end',
    marginRight: '2.5%',
    marginBottom: '2.5%',
    marginTop: Platform.select({
      android: '2.5%',
      ios: 0
    })
  },
  closeModalIcon: {
    height: 30,
    width: 30
  },
  searchTextInput: {
    fontSize: 15,
    width: '100%'
  },
  searchTextIcon: {
    height: 28,
    width: 28,
    marginLeft: 5,
    marginRight: 2.5
  },
  searchTextInputBorder: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: '8%',
    marginRight: '8%',
    height: 40,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 30
  },
  resultText: {
    fontSize: 20,
    alignSelf: 'flex-start'
  },
  queryListView: {
    backgroundColor: '#F4F4F4',
    borderRadius: 9,
    marginTop: 17,
    paddingTop: 14,
    marginLeft: '8%',
    paddingLeft: '7%',
    marginRight: '8%',
    paddingRight: '7%',
    paddingBottom: 14,
  }
})
