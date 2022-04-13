import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    FlatList,
    StyleSheet,
    Text,
    View,
    Alert,
    Platform,
    TouchableHighlight,
    RefreshControl,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

import flatListData from '../data/flatListData';
import AddModal from './AddModal';
import EditModal from './EditModal';
import { getFoodsFromServer } from '../netWorking/Server'

class FlatListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeRowKey: null,
            numberOfrefresh: 0,
        }
    }
    refreshFlatListItem = () => {
        this.setState((prevState) => {
            return {
                numberOfrefresh: prevState.numberOfrefresh++
            }
        })
    }
    render() {
        const swipeSetting = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowKey = ! null) {
                    this.setState({ activeRowKey: null })
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key })
            },
            right: [
                {
                    onPress: () => {
                        this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this)
                    },
                    text: 'Edit', type: 'primary'
                },
                {
                    onPress: () => {
                        const deleteRow = this.state.activeRowKey
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                                { text: 'No', onPress: () => console.log(`Cancel Pressed`), style: 'cancel' },
                                {
                                    text: 'Yes', onPress: () => {
                                        flatListData.splice(this.props.index, 1)
                                        this.props.parentFlatList.refreshFlatList(deleteRow)
                                    }
                                }
                            ],
                            { cancelable: true }
                        )
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionID: 1,
        }
        return (
            <Swipeout {...swipeSetting}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column'
                }} >
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        //backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato'
                        backgroundColor: 'mediumseagreen'
                    }} >
                        <Image
                            style={{ width: 100, height: 100, margin: 5 }}
                            source={{ uri: 'http://' + this.props.item.imageUrl }}
                        />
                        <View style={{
                            flex: 1,
                            flexDirection: 'column'
                        }} >
                            <Text style={style.flatListItem} >{this.props.item.name}</Text>
                            <Text style={style.flatListItem} >{this.props.item.foodDescription}</Text>
                        </View>
                    </View>
                    <View style={{
                        height: 2,
                        backgroundColor: 'white',
                    }} />
                </View>
            </Swipeout>
        )
    }
}

const style = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
})

export default class BasicFlatList extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            deleteRowKey: null,
            refreshing: false,
            foodsFromServer: [],
        })
        this._onPressAdd = this._onPressAdd.bind(this)
    }
    componentDidMount() {
        this.refreshDataFromServer();
    }
    refreshDataFromServer = () => {
        this.setState({ refreshing: true });
        getFoodsFromServer().then((foods) => {
            this.setState({ foodsFromServer: foods });
            this.setState({ refreshing: false });
        }).catch((error) => {
            this.setState({ foodsFromServer: [] });
            this.setState({ refreshing: false });
        })
    }
    onRefresh = () => {
        this.refreshDataFromServer();
    }
    refreshFlatList = (ativeKey) => {
        this.setState((prevState) => {
            return {
                deleteRowKey: ativeKey
            }
        })
        this.refs.flatList.scrollToEnd()
    }
    _onPressAdd() {
        //alert('You add Item')
        this.refs.addModal.showAddModal()
    }
    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: Platform.OS === 'ios' ? 34 : 0,
            }} >
                <View style={{
                    backgroundColor: 'tomato',
                    height: 64,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }} >
                    <TouchableHighlight
                        style={{
                            margin: 10,
                            backgroundColor: 'tomato'
                        }}
                        underlayColor='green'
                        onPress={this._onPressAdd}
                    >
                        <Image
                            style={{ width: 35, height: 35 }}
                            source={require('../icons/icons-add.png')}
                        />
                    </TouchableHighlight>
                </View>
                <FlatList
                    ref={'flatList'}
                    // data={flatListData}
                    data={this.state.foodsFromServer}
                    renderItem={({ item, index }) => {
                        console.log(`Item = ${JSON.stringify(item)}, index = ${index}`)
                        return (
                            <FlatListItem
                                item={item}
                                index={index}
                                parentFlatList={this}
                            />
                        )
                    }}
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                />
                <AddModal ref={'addModal'} parentFlatList={this} />
                <EditModal ref={'editModal'} parentFlatList={this} />
            </View>
        )
    }
}