import {StyleSheet, Platform} from 'react-native'

export const styles = StyleSheet.create({
  card: {
    height: 101,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 14,
    marginRight: 13,
    marginLeft: 13,
    justifyContent: 'space-between'
  },
  cardColorDay: {
    backgroundColor: '#93d8f0',
  },
  cardColorCloudy: {
    backgroundColor: '#c3d6d8',
  },
  cardColorNight: {
    backgroundColor: '#474856'
  },
  cardLeft: {
    marginTop: '2%',
    marginLeft: '4%',
    marginBottom: Platform.select({
      android: '11%',
      ios: '8%'
    }),
    justifyContent: 'space-between'
  },
  cardRight: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2%',
    marginRight: '2%',
    marginBottom: Platform.select({
      android: '11%',
      ios: '8%'
    }),
  },
  proximaNovaThin: {
    fontFamily: Platform.select({
      android: 'proximanova-thin',
      ios: 'proxima nova'
  }),
    fontWeight: '300',
  },
  proximaNovaSemibold: {
    fontFamily: Platform.select({
      android: 'proximanova-semibold',
      ios: 'proxima nova'
  }),
    fontWeight: '600'
  },
  locationNameText: {
    color: '#EBA8A1',
    fontSize: 15.5,
    fontWeight: "600"
  },
  conditionText: {
    color: '#AAAEB0',
    fontSize: 21,
  },
  timeText: {
    color: '#AAAEB0',
    fontSize: 28,
  },
  temperatureView: {
    flexDirection: 'row',
  },
  temperatureText: {
    color: 'white',
    fontSize: 28,
  },
  temperatureUnitText: {
    color: 'white',
    fontSize: 28,
  },
  weatherIcon: {
    width: 65,
    height: 53,
    marginTop: '5%',
  },
  searchCard: {
    backgroundColor: '#545454',
    height: 101,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 14,
    marginRight: 13,
    marginLeft: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCardIcon: {
    marginRight: '2%',
    height: 37,
    width: 37
  },
  searchCardText: {
    color: '#CFCFCF',
    fontSize: 21,
    fontFamily: 'proxima nova'
  }
})
