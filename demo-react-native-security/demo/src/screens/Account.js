import { PureComponent } from "react"
import {Text} from "react-native"
export class Account extends PureComponent {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //Logique de vérification d'accès (A ne pas faire)
    }

    render() {
        return(
            <>
                <Text>
                    Account
                </Text>
            </>
        )
    }
}