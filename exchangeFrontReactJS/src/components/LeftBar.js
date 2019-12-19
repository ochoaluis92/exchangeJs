import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import LinearProgress from '@material-ui/core/LinearProgress';

class LeftBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "exchanges": [],
            "load": true
        }
    }
    /**
     * get the exchange top tranding
     */
    getExchangeTop(){
        this.setState({"load": true});
        axios.get('http://localhost:3000/exchange/exchangesTop')
            .then(res => {
            const exchangesTop = res.data;
            const requestPool = [];
            const exchanges = [];
            exchangesTop.forEach(element => {
                requestPool.push(axios.get('http://localhost:3000/exchange/exchange/' + element.name+'/ARS'));
            });

            axios.all(requestPool).then(axios.spread((...responses) => {
                responses.forEach(element => {
                    exchanges.push(element.data)
                });
                this.setState({ "exchanges": exchanges, "load": false});
            })).catch(errors => { 
                console.error(errors);
            });
        })
    }
    componentDidMount() {
        this.getExchangeTop();
        setInterval(() => {
            this.getExchangeTop();
        }, 5000);
    };
    render(){
        let s1 = {verticalAlign: 'middle'};
        return (
            <div>
                <LinearProgress color="secondary" style={this.state.load ? {}: { display: 'none' }}/>           
                { this.state.exchanges.map((exchange, i) => 
                    <div key={i}>
                    <Card style={{backgroundColor: '#CFFF7E'}}>
                        <CardActionArea>
                            <CardContent>
                            <span className="mui--text-display1" >{exchange.moneda}</span>
                            <div className="mui--divider-top" key={i}>
                                1 {exchange.moneda}  => {exchange.precio} ARS
                            </div>
                            </CardContent>
                        </CardActionArea>
                    </Card><br></br>
                    </div>
                )}
            </div>
        );
    }
}

export default LeftBar;