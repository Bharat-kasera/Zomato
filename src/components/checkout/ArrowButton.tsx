import { View,  TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { FC } from 'react'
import CustomText from '@components/global/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@unistyles/Constants';

interface ArrowButtonProps {
    title: string;
    onPress: () => void;
    price?: number;
    loading?: boolean
}
const ArrowButton: FC<ArrowButtonProps> = ({ loading, title, onPress, price }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} disabled={loading} onPress={onPress} style={[styles.btn, {
            justifyContent: price != 0 ? 'space-between' : 'center'
        }]}>
            {price != 0 && price &&
                <View>
                    <CustomText variant='h6' style={{ color: 'white' }} fontFamily='Okra-Bold'>
                        ₹ {price + 34}.0
                    </CustomText>
                    <CustomText fontSize={9} style={{ color: 'white' }} fontFamily='Okra-Medium'>
                        TOTAL
                    </CustomText>
                </View>
            }
            <View style={styles.flexRow}>
                <CustomText fontSize={12} style={{ color: '#fff',top:-1 }} fontFamily='Okra-Bold'>
                    {title}
                </CustomText>
                {loading ? <ActivityIndicator size='small' color='white' style={{ marginHorizontal: 5 }} /> :
                    <Icon name='arrow-right' color='#fff' size={RFValue(25)} />}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.active,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        marginHorizontal: 15
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ArrowButton