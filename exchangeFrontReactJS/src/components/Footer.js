import React from 'react';
import Appbar from 'muicss/lib/react/appbar';

class Footer extends React.Component {
    
    render(){
        let s1 = {verticalAlign: 'middle', textAlign: 'left'};    
        return (
            <Appbar>
                <table width="100%">
                    <tbody>
                        <tr style={s1}>
                            <td className="mui--appbar-height mui--text-display5" style={s1}>
                                Development by 8A 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Appbar>
        );
    }

}

export default Footer;