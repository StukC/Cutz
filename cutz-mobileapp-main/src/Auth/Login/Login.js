import {ScrollView, StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomLogo from '../../components/CustomLogo'
import {Spacer} from '../../components/Spacer'
import CustomTextInput from '../../components/CustomTextInput'
import LoginBody from './molecules/LoginBody'
import LoginBottom from './molecules/LoginBottom'
import commonStyles from '../../utils/CommonStyles'
import {verticalScale} from 'react-native-size-matters'


const Login = ({ navigation, route }) => {
    const user = route?.params?.checkUser
    const [checkUser, setCheckUser] = useState(user ? user : "Client");
 
    return (
      <SafeAreaView style={{...commonStyles.commonMain, paddingHorizontal: 20}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={12}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: "white", flex: 1, height: "100%",
            }}
          >
            <CustomLogo />
            <LoginBody
              user={user}
              checkUser={checkUser}
              setCheckUser={setCheckUser}
              navigation={navigation}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({})
