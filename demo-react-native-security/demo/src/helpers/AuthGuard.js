import {Text} from "react-native"
export const AuthGuard = (Component, props) => {
    //logique de vérification 
    const isLogged = false

    return (isLogged) ? (<Component {...prop} />) : <><Text>Not Allowed</Text></>
}