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
export default class EditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodName: '',
            description: '',
        }
    }
    showEditModal = (editingFood, flatListItem) => {
        this.setState({
            key: editingFood.key,
            foodName: editingFood.name,
            foodDescription: editingFood.description,
            flatListItem: flatListItem,
        })
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
                    placeholder="Enter food's name"
                    value={this.state.foodName}
                    onChangeText={(text) => { this.setState({ foodName: text }) }}
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
                    placeholder="Enter food's description"
                    value={this.state.description}
                    onChangeText={(text) => { this.setState({ description: text }) }}
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
                        if (this.state.foodName.length == 0 || this.state.description.length == 0) {
                            alert('You must enter something')
                            return
                        }
                        
                        var foundIndex = flatListData.findIndex(item => this.state.key == item.key)
                        if (foundIndex < 0) {
                            return
                        }
                        flatListData[foundIndex].name = this.state.foodName
                        flatListData[foundIndex].foodDescription = this.state.description
                        this.state.flatListItem.refreshFlatListItem()
                        
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