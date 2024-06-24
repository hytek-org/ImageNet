import { Pressable, StyleSheet, Text, View, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/comman';
import Categories from '../../components/category';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import { debounce } from 'lodash';
import Filtermodal from '../../components/filtersModal';
import { useRouter } from 'expo-router';



var page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const router = useRouter();
  const [isendReached ,setisendReached] = useState(false)

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = true) => {
    console.log('Fetching images with params:', params, append);
    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImages(prevImages => [...prevImages, ...res.data.hits]);
      } else {
        setImages(res.data.hits);
      }
    }
  };

  // For open and close icon
  const openFiltersModal = () => {
    modalRef?.current?.present();
  }
  const closeFiltersModal = () => {
    modalRef?.current?.close();
  }

  const applyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);

      let params = {
        page,
        ...filters
      }

      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
      console.log('Filters applied', filters);
    }

    closeFiltersModal();
  }

  const resetFilters = () => {
    if (filters) {
      page = 1;
      setFilters({});
      let params = {
        page,
      }

      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }
    closeFiltersModal();
  }

  const clearThisFilter = (filterName) => {
    let filterz = { ...filters };
    delete filterz[filterName];
    setFilters({ ...filterz });
    page = 1;
    setImages([]);
    let params = { page, ...filterz };
    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search;
    fetchImages(params, false);
  }

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params = { page, ...filters };
    if (cat) params.category = cat;
    fetchImages(params, false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, q: text, ...filters }, false);
    } else if (text === "") {
      page = 1;
      searchInputRef?.current?.clear();
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, ...filters }, false);
    }
  };

  const clearSearch = () => {
    setSearch('');
    searchInputRef?.current?.clear();
  };
// scroll down funtion

const handleScroll = (event)=>{
  const contentHeight = event.nativeEvent.contentSize.height;
  const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
  const scrollOffset = event.nativeEvent.contentOffset.y;
  const bottomPosition = contentHeight - scrollViewHeight;

  if (scrollOffset>=bottomPosition-1) {
    if (!isendReached) {
      setisendReached(true);
      console.log('reached to the bottom of scroll')

      // rendering more images
      ++page;
      let params = {page, ...filters}
      if (activeCategory) params.category = activeCategory;
      if(search) params.q =search;
      fetchImages(params)
        
    }
  }else if(isendReached){
    setisendReached(false);
  }
};

 //scroll up funtion
 const handleScrollUp = () =>{
  scrollRef?.current?.scrollTo({
    y:0,
    animated: true,
  })
 }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  console.log('Selected filter:', filters);

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>
            Pixi 
          </Text> 
          {/* our image need to be changed */}
        </Pressable>
        <Pressable onPress={openFiltersModal}>
          <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)} />
        </Pressable>
      </View>

      <ScrollView 
      onScroll={handleScroll}
      scrollEventThrottle={5} //how often scroll event will be fire while scrolling in ms
      ref={scrollRef}
      contentContainerStyle={{ gap: 15 }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather name='search' size={24} color={theme.colors.neutral(0.4)} />
          </View>
          <TextInput
            placeholder='Search for photos...'
            ref={searchInputRef}
            onChangeText={handleTextDebounce}
            style={styles.searchInput}
          />
          {
            search && (
              <Pressable onPress={clearSearch} style={styles.closeIcon}>
                <Ionicons name='close' size={24} color={theme.colors.neutral(0.6)} />
              </Pressable>
            )
          }
        </View>
        {/* Category */}
        <View style={styles.categories}>
          <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
        </View>

        {/* Filters */}
        {
          Object.keys(filters).length > 0 && (
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
                {
                  Object.keys(filters).map((key) => {
                    return (
                      <View key={key} style={styles.filterItem}>
                        {
                          key === "color" ? (
                            <View style={{
                              height: 20,
                              width: 30,
                              borderRadius: 7,
                              backgroundColor: filters[key]
                            }} />
                          ) : (
                            <Text style={styles.filterItemText}>{filters[key]}</Text>
                          )
                        }
                        <Pressable style={styles.filterCloseItem} onPress={() => clearThisFilter(key)}>
                          <Ionicons name='close' size={14} color={theme.colors.neutral(0.9)} />
                        </Pressable>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          )
        }

        {/* Image Masonry Grid */}
        <View>
          {images.length > 0 && <ImageGrid images={images} router={router} />}
        </View>

        {/* Loading More Images */}
        <View style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}>
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Filtermodal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFiltersModal}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    
  },
  header: {
    marginHorizontal: wp(7),
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9)
  },
  searchBar: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.xl
  },
  searchIcon: {
    padding: 9
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(2),
  },
  closeIcon: {
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  filters: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    padding: 8,
    gap: 10,
    paddingHorizontal: 10,
  },
  filterItemText: {
    fontSize: hp(2)
  },
  filterCloseItem: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 4,
    borderRadius: 7
  }
});
