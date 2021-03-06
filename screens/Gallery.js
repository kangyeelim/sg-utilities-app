import React from 'react';
import { View, Image, ScrollView, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

var { height, width } = Dimensions.get('window');

export default ({captures, onDelete}) => (
        <View style={{ alignSelf: 'center', marginTop: 30, marginBottom: 30}}>
        {captures.map((uri) => (
            <View style={{
              width: 0.8 * width,
              height: 0.75 * height,
              alignSelf:'center',
              marginBottom:30 }}>
              <ImageBackground source={{uri}} style={{width: 0.8 * width, height: 0.75 * height}} />
              <TouchableOpacity style={{alignSelf:'center', marginBottom: 10}} onPress={() => onDelete(uri)}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>

        ))}
        </View>

);
