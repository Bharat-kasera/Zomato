import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { useSharedState } from '@features/tabs/SharedContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStyles } from 'react-native-unistyles'
import { cartStyles } from '@unistyles/cartStyles'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { clearAllCarts } from '@states/reducers/cartSlice'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'
import CartItem from './CartItem'

const CartHOC: FC = () => {

    const dispatch = useAppDispatch()
    const carts = useAppSelector((state) => state.cart.carts)
    const { scrollY } = useSharedState()
    const bottom = useSafeAreaInsets()
    const { styles } = useStyles(cartStyles)
    const [isExpand, setIsExpand] = useState(false)
    const totalCartsLength = carts?.length

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{
            translateY: scrollY.value === 1 ?
                withTiming(Platform.OS === 'ios' ? -15 : 0, { duration: 300 })
                :
                withTiming(Platform.OS === 'ios' ? -90 : -100, { duration: 300 })
        }]
    }))

    const clearCart = async () => {
        dispatch(clearAllCarts())
        setIsExpand(false)
    }


    if (!totalCartsLength) return null

    return (
        <Animated.View style={[
            isExpand ? styles.expandedCartContainer : styles.cartContainer,
            animatedStyle,
            {
                paddingBottom: !isExpand ? bottom.bottom + 16 : 0
            }
        ]}>
            {carts?.length > 1 && !isExpand && (
                <TouchableOpacity activeOpacity={0.9} onPress={() => setIsExpand(true)} style={styles.moreButton}>
                    <CustomText
                        style={{ top: -1 }}
                        color={Colors.active}
                        fontSize={9}
                        fontFamily='Okra-Medium'
                    >
                        +{carts?.length - 1} more
                    </CustomText>
                    <Icon iconFamily='Ionicons' name='caret-up-outline' color={Colors.active} size={10} />
                </TouchableOpacity>
            )}

            {Platform.OS === 'ios' && isExpand && (
                <BlurView style={styles.absolute} blurType='light' blurAmount={10} />
            )}

            {
                isExpand && (
                    <View style={styles.contentContainer} />
                )
            }

            {
                isExpand &&
                <TouchableOpacity style={styles.closeIcon} onPress={() => setIsExpand(false)}>
                    <Icon iconFamily='Ionicons' name='close' size={20} color='#fff' />
                </TouchableOpacity>
            }


            {
                isExpand ?
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.flexRowBetween}>
                            <CustomText variant='h5' fontFamily='Okra-Medium'>
                                Your Carts
                            </CustomText>
                            <TouchableOpacity onPress={clearCart}>
                                <CustomText fontSize={10} fontFamily='Okra-Bold' color={Colors.active}>Clear all</CustomText>
                            </TouchableOpacity>
                        </View>

                        {carts?.map((item, index) => {
                            return (
                                <View key={index}
                                    style={[
                                        { position: !isExpand ? 'absolute' : 'relative' },
                                        !isExpand && { transform: [{ scale: index === totalCartsLength - 1 ? 1 : 0.98 }] },
                                        !isExpand && { top: !isExpand ? index === totalCartsLength - 1 ? 0 : -8 : undefined },
                                        !isExpand && { zIndex: !isExpand ? index === totalCartsLength - 1 ? 99 : 98 : undefined },
                                        isExpand && { width: '100%' }

                                    ]}
                                >
                                    <CartItem item={item} />
                                </View>
                            )
                        })}
                    </ScrollView>
                    :
                    <>
                        {carts?.map((item, index) => {
                            return (
                                <View key={index}
                                    style={[
                                        { position: !isExpand ? 'absolute' : 'relative' },
                                        !isExpand && { transform: [{ scale: index === totalCartsLength - 1 ? 1 : 0.98 }] },
                                        !isExpand && { top: !isExpand ? index === totalCartsLength - 1 ? 0 : -8 : undefined },
                                        !isExpand && { zIndex: !isExpand ? index === totalCartsLength - 1 ? 99 : 98 : undefined },
                                        isExpand && { width: '100%' }

                                    ]}
                                >
                                    <CartItem item={item} />
                                </View>
                            )
                        })}
                    </>
            }






            {!isExpand &&
                <LinearGradient
                    colors={[
                        'rgba(255,255,255,0.1)',
                        'rgba(255,255,255,1)',
                        'rgba(255,255,255,1)',
                        'rgba(255,255,255,1)',
                        'rgba(255,255,255,0.98)',
                        'rgba(255,255,255,1)',
                    ]}
                    style={{
                        position: "absolute",
                        width: '100%',
                        height: 92,
                        zIndex: -1,
                        bottom: -20
                    }}
                />

            }

        </Animated.View>
    )
}

export default CartHOC