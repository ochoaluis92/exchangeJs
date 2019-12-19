import React from 'react';
import Appbar from 'muicss/lib/react/appbar';

class Header extends React.Component {
    
    render(){
        let s1 = {verticalAlign: 'middle'};    
        return (
            <Appbar>
                <table width="100%">
                    <tbody>
                    <tr style={s1}>
                        <td className="mui--appbar-height mui--text-display1" style={s1}>
                            Exchange
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Appbar>
        );
    }

}

export default Header;