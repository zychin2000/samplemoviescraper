import {ActivityIndicator, Image, ScrollView, Text, View} from "react-native";
import * as React from "react";
import {isLoading} from "expo-font";


export default function DetailScreen({route, navigation}) {
    const {itemId} = route.params;
    return (
        <View>
            <MovieDetailScreen movieId={itemId}/>
        </View>
    );
}

class MovieDetailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieId: props.movieId,
            data: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({isLoading: true})
        fetch('http://www.omdbapi.com/?apikey=28f4dae9&plot=full&i=' + this.state.movieId)
            .then((response) => response.json())
            .then((json) => {
                this.setState({data: json});
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({isLoading: false});
            });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
                <ScrollView>
                    <View style={{padding:24}}>
                    <Image
                        style={{width: 320, height: 480}}
                        source={{
                            uri: this.state.data.Poster
                        }}
                    />
                    <Text>Movie Title: {this.state.data.Title}</Text>
                    <Text>Year: {this.state.data.Year}</Text>
                    <Text>Genre: {this.state.data.Genre}</Text>
                    <Text>iMDB Rating: {this.state.data.imdbRating}</Text>
                    <Text>Plot: {this.state.data.Plot}</Text>
                    </View>
                </ScrollView>
        );
    }
};


