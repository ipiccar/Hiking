
import React, { Component } from 'react';
import { View, Image, Text, SectionList, TouchableOpacity, SafeAreaView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import SvgUri from 'react-native-svg-uri';

const sections = [
  {
    title: 'Couverture du sol',
    colour:'#393B49',
    icon: 0,
    zIndex: 20,
    data: [
      { key : 0, label: 'Feuillus', image: 0 },
      { key : 1, label: 'Broussaille', image: 1 },
      { key : 2, label: 'Confières', image: 2 },
      { key : 3, label: 'Mixte (feuillus, confières)', image: 3 },
      { key : 4, label: 'Jardin', image: 4 },
      { key : 5, label: 'Cimetière', image: 5 },
      { key : 6, label: 'Lande', image: 6 },
      { key : 7, label: 'Lande avec arbres', image: 7 },
      { key : 8, label: 'Lande buissonneuse', image: 8 },
      { key : 9, label: 'Surface cultivée', image: 9 },
      { key : 10, label: 'Verger', image: 10 },
      { key : 11, label: 'Prairie permanente', image: 11 },
      { key : 12, label: 'Peupleraie', image: 12 },
      { key : 13, label: 'Pépinière, oseraie', image: 13 },
      { key : 14, label: 'Rochers', image: 14 },
      { key : 15, label: 'Sable', image: 15 },
      { key : 16, label: 'Roselière', image: 16 },
      { key : 17, label: 'Végétation herbacée non spécifiée', image: 17 },
      { key : 18, label: 'Pelouse', image: 18 },
      { key : 19, label: 'Aire stérile', image: 19 },
      { key : 20, label: 'Slikke, schorre', image: 20 },
      { key : 21, label: 'Marais', image: 21 },
      { key : 22, label: 'Terrain marécageux', image: 22 },
    ],
  },
  {
    title: 'Végétation linéaire et ponctuelle',
    colour: '#444D57',
    icon: 1,
    zIndex: 1,
    data: [
      { key : 23, label: 'Feuillus', image: 1 },
      { key : 24, label: 'Broussaille', image: 2 },
      { key : 25, label: 'Feuillus', image: 1 },
    ],
  },
  {
    title: 'Bâtiments',
    colour: '#516C6B',
    icon: 2,
    zIndex: 2,
    data: [
      { key : 26, label: 'Feuillus', image: 1 },
      { key : 27, label: 'Broussaille', image: 2 },
      { key : 28, label: 'Feuillus', image: 1 },
    ],
  },
  {
    title: 'Réseaux, routes et chemins',
    colour: '#698C7A',
    icon: 3,
    zIndex: 3,
    data: [
      { key : 29, label: 'Feuillus', image: 1 },
      { key : 30, label: 'Broussaille', image: 2 },
      { key : 31, label: 'Feuillus', image: 1 },
    ],
  },
  {
    title: 'Hydrographie',
    colour: '#8CA48D',
    icon: 4,
    zIndex: 4,
    data: [
      { key : 32, label: 'Feuillus', image: 1 },
      { key : 33, label: 'Broussaille', image: 2 },
      { key : 34, label: 'Feuillus', image: 1 },
    ],
  },
  {
    title: 'Réseau électrique haute tension',
    colour: '#ABBEA6',
    icon: 5,
    zIndex: 5,
    data: [
      { key : 35, label: 'Feuillus', image: 1 },
      { key : 36, label: 'Broussaille', image: 2 },
      { key : 37, label: 'Feuillus', image: 1 },
    ],
  },
  {
    title: 'Construction, objets divers',
    colour: '#DED3BF',
    icon: 6,
    zIndex: 6,
    data: [
      { key : 38, label: 'Feuillus', image: 1 },
      { key : 39, label: 'Broussaille', image: 2 },
      { key : 40, label: 'Feuillus', image: 1 },
    ],
  },
  {
    title: 'Zones particulières',
    colour: '#8F6C5C',
    icon: 7,
    zIndex: 7,
    data: [
      { key : 41, label: 'Feuillus', image: 1 },
      { key : 42, label: 'Broussaille', image: 2 },
      { key : 43, label: 'Feuillus', image: 1 },
    ],
  },
  {
    title: 'Figures du terrain',
    colour: '#7D544D',
    icon: 8,
    zIndex: 8,
    data: [
      { key : 44, label: 'Feuillus', image: 1 },
      { key : 45, label: 'Broussaille', image: 2 },
      { key : 46, label: 'Feuillus', image: 1 },
    ],
  },
  {
    title: 'Données administratives',
    colour: '#5B343C',
    icon: 9,
    zIndex: 9,
    data: [
      { key : 47, label: 'Feuillus', image: 1 },
      { key : 48, label: 'Broussaille', image: 2 },
    ],
  },

  {
    title: 'Toponymie',
    colour: '#341D30',
    icon: 10,
    zIndex: 10,
    data: [
      { key : 49, label: 'Feuillus', image: 1 },
      { key : 50, label: 'Broussaille', image: 2 },
      { key : 51, label: 'Feuillus', image: 1 },
    ],
  },
];

const legendImages = [
  require('../images/legend/0_feuillus.png'),
  require('../images/legend/1_brousailles.png'),
  require('../images/legend/2_confieres.png'),
  require('../images/legend/3_mixte.png'),
  require('../images/legend/4_jardin.png'),
  require('../images/legend/5_cimetiere.png'),
  require('../images/legend/6_lande.png'),
  require('../images/legend/7_lande_arbres.png'),
  require('../images/legend/8_lande_buisson.png'),
  require('../images/legend/9_surface_cultivee.png'),
  require('../images/legend/10_verger.png'),
  require('../images/legend/11_prairie_permanente.png'),
  require('../images/legend/12_peupleraie.png'),
  require('../images/legend/13_pepiniere.png'),
  require('../images/legend/14_rochers.png'),
  require('../images/legend/15_sable.png'),
  require('../images/legend/16_roseliere.png'),
  require('../images/legend/17_vegetation.png'),
  require('../images/legend/18_pelouse.png'),
  require('../images/legend/19_aire_sterile.png'),
  require('../images/legend/20_slikke.png'),
  require('../images/legend/21_marais.png'),
  require('../images/legend/22_marecageux.png'),
];

const legendIcons = [
  require('../images/icon_land.png'),
  require('../images/icon_plant.png'),
  require('../images/icon_building.png'),
  require('../images/icon_road.png'),
  require('../images/icon_water.png'),
  require('../images/icon_electric.png'),
  require('../images/icon_satelite.png'),
  require('../images/icon_industry.png'),
  require('../images/icon_elevation.png'),
  require('../images/icon_border.png'),
  require('../images/icon_name.png'),
];

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class LegendActivity extends React.PureComponent {

  state = {
    activeSection: '',
    isReady: false,
  };

  async _loadAssetsAsync() { //get all required images in cache before page load
    const imageAssets = cacheImages(legendImages);
    const iconAssets = cacheImages(legendIcons);
    await Promise.all([...imageAssets,...iconAssets]);
  }

  onPress = section => {
    this.setState({
      activeSection: this.state.activeSection === section.title
        ? ''
        : section.title,
    });
  };

  render() {
    if (!this.state.isReady) { //trigger image load in cache
      //return ();
    }
    return (
      <SafeAreaView>
        <SectionList
          sections={sections}
          renderSectionHeader={({ section }) => (
            <View style={{backgroundColor: section.colour, zIndex: section.zIndex}}>
            <TouchableOpacity style={styles.header} onPress={() => this.onPress(section)}>
              <View style={styles.iconWrapper}>
                <Image style={styles.iconHeader} source={legendIcons[section.icon]} />
              </View>
              <Text style={styles.textHeader}>{section.title}</Text>
            </TouchableOpacity>
            </View>
          )}
          renderItem={({ item, section }) => (
            <View style={{backgroundColor: section.colour}}>
            <Collapsible
              key={item.key}
              collapsed={section.title !== this.state.activeSection}
              style={styles.collapsible}>

              <View style={styles.item}>
                <View style={styles.itemTextBlock}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </View>
                <Image
                  source={legendImages[item.image]}
                />
              </View>
            </Collapsible>
          </View>
          )}
        />
      </SafeAreaView>
    )
  }
}

const styles = {
  header: {
    height: 150,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor:'#000',
    shadowOpacity:0.8,
    shadowOffset:{width:0, height:2},
    shadowRadius: 8,
  },
  textHeader: {
    flex: 2,
    fontSize: 24,
    color: '#fff',
    padding: 5,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  iconHeader: {
    width: 60,
    height: 60,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    borderColor:'#ddd',
    borderWidth: 1,
    shadowColor:'#000',
    padding: 15,
    marginTop: 10,
    backgroundColor: '#fff'
  },
  itemText: {
    fontSize: 24,
    textAlign: 'center',
  },
  itemTextBlock: {
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 2,
  },
  collapsible: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

export { LegendActivity };
