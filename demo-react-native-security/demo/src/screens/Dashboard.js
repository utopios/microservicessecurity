import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import EncryptedStorage from 'react-native-encrypted-storage'

export default function Dashboard({ navigation }) {
  const [firstLoading, setFirstLoading] = useState(false)
  useEffect(() => {
    EncryptedStorage.getItem('code').then(code => {
        EncryptedStorage.getItem('code_verifier').then(code_verifier => {
          axios.post('http://localhost:4001/token',{code:code, code_verifier:code_verifier}).then(res => {
            if(res.data.token) {
              //Sauvegarde Token
            }
            else {
              //Redirect to Login
            }
          })
        })
    })
  }, [firstLoading])
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  )
}
