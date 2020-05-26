import * as React from 'react';
import {ActivityIndicator, FlatList, Platform, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {ListItem, SearchBar} from 'react-native-elements';
import {createStackNavigator} from "@react-navigation/stack";
import MovieDetailScreen from "./MovieDetailScreen";

class FlatListDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
        };

        this.arrayholder = [];
    }


    async makeRemoteRequest (searchTerm)  {
        //const url = `https://randomuser.me/api/?&results=20`;
        const url = 'http://www.omdbapi.com/?apikey=28f4dae9&s=' + searchTerm;
        this.setState({loading: true});

        console.log("fetching api from: " + 'http://www.omdbapi.com/?apikey=28f4dae9&s=' + searchTerm)
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.Search,
                    error: res.error || null,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });


    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

    searchFilterFunction = async(text) => {


        this.setState({
            value: text,
        });

        this.makeRemoteRequest(text)

        // const newData = this.arrayholder.filter(item => {
        //     const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
        //     const textData = text.toUpperCase();
        //
        //     return itemData.indexOf(textData) > -1;
        // });
        //
        // this.setState({
        //     data: newData,
        // });
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Search for a movie here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };

    handleTouchItem = (item) => {
        this.props.navigation.navigate("MovieDetailScreen", item);
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <ListItem
                            onPress={() => this.handleTouchItem(item)}
                            //leftAvatar={{source: {uri: item.Poster}}}
                            title={item.Title}
                            subtitle={item.Year}
                        />
                    )}

                    keyExtractor={item => item.imdbID}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }
}


export default function SearchScreen() {
    return <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <FlatListDemo/>
    </View>


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
