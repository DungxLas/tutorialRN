import React, { Component } from 'react';
import {
    Text,
    Platform,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from 'react-native';
import ModalBox from 'react-native-modalbox';

import flatListData from '../data/flatListData';
import BasicFlatList from './BasicFlatList';

var screen = Dimensions.get('window')
export default class AddModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newFoodName: '',
            newDescription: '',
        }
    }
    showAddModal = () => {
        this.refs.myModal.open()
    }
    generateKey = (numberOfCharacter) => {
        return require('random-string')({length: numberOfCharacter})
    }
    render() {
        return (
            <ModalBox
                ref={'myModal'}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280,
                }}
                position='center'
                backdrop={true}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40,

                }}>New food information</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 2,
                    }}
                    placeholder="Enter new food's name"
                    value={this.state.newFoodName}
                    onChangeText={(text) => { this.setState({ newFoodName: text }) }}
                />
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 2,
                    }}
                    placeholder="Enter new food's description"
                    value={this.state.newDescription}
                    onChangeText={(text) => { this.setState({ newDescription: text }) }}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: 'mediumseagreen',
                        padding: 10,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        if (this.state.newFoodName.length == 0 || this.state.newDescription.length == 0) {
                            alert('You must enter something')
                            return
                        }
                        const newKey = this.generateKey(24)
                        const newFood = {
                            key: newKey,
                            name: this.state.newFoodName,
                            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Foods_%28cropped%29.jpg",
                            foodDescription: this.state.newDescription
                        }
                        flatListData.push(newFood)
                        this.props.parentFlatList.refreshFlatList(newKey)
                        this.refs.myModal.close()
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        color: 'white',
                    }}>Save</Text>
                </TouchableOpacity>
            </ModalBox>
        )
    }
}