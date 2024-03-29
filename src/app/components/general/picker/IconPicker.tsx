import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useEffect, useState} from 'react';
import {Button, FlatList, Pressable, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import SearchBar from '../SearchBar';

type Props = {
  isVisible: boolean; 
  onSelectionChanged(selectedIcon: string | null): void;
  selectedIcon: string | null
};

const IconPicker = (props: Props) => {

  const [filteredList, setFilteredList] = useState(icons);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const searchResult = icons.filter(el =>
      el.includes(searchTerm.toLowerCase()),
    );
    setFilteredList(searchResult);
  }, [searchTerm]);

  const {selectedIcon, onSelectionChanged}  = props;

  return (
    <>
        <View style={{backgroundColor: 'white', padding: 10}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <SearchBar
              style={{flexBasis: '90%'}}
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
          </View>

          <FlatList
            numColumns={6}
            data={filteredList}
            renderItem={item => {
              {
                const el = item.item;

                if (el === selectedIcon) {
                  return (
                    <Pressable onPress={() => onSelectionChanged(el)}>
                      <View
                        style={{
                          padding: 5,
                          backgroundColor: '#b4cffa',
                          margin: 6,
                        }}>
                        <FontAwesomeIcon size={32} icon={['fas', el as any]} />
                      </View>
                    </Pressable>
                  );
                } else
                  return (
                    <Pressable onPress={() => onSelectionChanged(el)}>
                      <View style={{padding: 5, margin: 6}}>
                        <FontAwesomeIcon size={32} icon={['fas', el as any]} />
                      </View>
                    </Pressable>
                  );
              }
            }}
          />
        </View>
    </>
  );
};

export default IconPicker;


const icons = [
    'house','utensils','wifi','cart-shopping','car','bicycle','train','plane-departure','plane','plane-arrival',
    'gas-pump','credit-card','dollar-sign','money-bill-1-wave', 'coins', 'sack-dollar', 'wallet', 'file-invoice-dollar', 
    'umbrella-beach','mountain-sun','camera-retro','shirt','hat-wizard','graduation-cap',
    'gift','gifts','burger','fish','pizza-slice', 'seedling','ice-cream','umbrella','dog','cat','hippo',
    'otter','paw','book','heart','heart-pulse','tree','cake-candles','martini-glass','wine-glass',
    'person-snowboarding','person-hiking','dumbbell','hand-holding-medical', 'suitcase-medical',
    'bath','shower','soap','briefcase','gamepad','tv', 'mobile-screen','phone','laptop',
    'snowflake','hammer','wrench','smoking', 'arrow-trend-up', 'arrow-trend-down', 'building-columns',
    'baby', 'baby-carriage'
  ];