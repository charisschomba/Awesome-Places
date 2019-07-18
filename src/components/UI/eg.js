import React, { PureComponent } from 'react'
import {Button} from 'react-native';
import { withNavigation } from 'react-navigation';


class B extends React.Component{
    render(){
       return <Button title="chariss" onPress={()=>this.props.navigation.navigate('Places')}/>
    }
}
export default withNavigation(B)
