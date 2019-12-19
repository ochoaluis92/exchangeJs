import React from 'react';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import axios from 'axios';

class ExchangeBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "select": [], 
            "exchangeFromTo": [],
            "exchange": {}
        };
        this.getCurrencies = this.getCurrencies.bind(this);
    }
    componentDidMount() {
        this.getCurrencies();
    };
    /**
     * get all currencies format to call others APIs
     * @param {*} event 
     */
    getCurrencies(event){
        axios.get('http://localhost:3000/exchange/currencies')
        .then(res => {
            let currencies = res.data;
            if(currencies != "error"){
                var select = Object.entries(currencies);
                var array = [];
                select.forEach(element => {
                    array.push({"cod": element[0], "currency": element[1]});
                });
                this.setState({ "select": array});
            } else {
                this.getCurrencies();
            }           
        }).catch(function (error) {
            // handle error
            console.error(error);
        })
    }
    /**
     * Calculate the exchange rate
     * @param {*} currencyFrom 
     * @param {*} currencyTo 
     */
    calculatedExchange(currencyFrom, currencyTo){
        axios.get('http://localhost:3000/exchange/exchange/'+currencyFrom+'/'+currencyTo)
        .then(res => {
            const exchange = res.data;
            this.setState({"select": this.state.select, "exchange": exchange, "exchangeFromTo": [currencyFrom,currencyTo]});         
        })
    }
    // submit form, excute the calculatedExchange
    submit(event){
        event.preventDefault();
        let currencyFrom = this.currencyFrom.controlEl.value;
        let currencyTo = this.currencyTo.controlEl.value;
        // this.getCurrencies();
        this.calculatedExchange(currencyFrom, currencyTo);
    }

    render(){
        if(this.state.select.length > 0){
            return (
                <div fluid={'true'} style={{minHeight: '450px'}}>
                    <form onSubmit={this.submit.bind(this)}>
                        <Col md="5">
                            <Select name="currencyFrom" defaultValue="USD" md="6" ref={el => { this.currencyFrom = el; }} >
                            { this.state.select.map((option, i) => 
                                <Option key={option.cod} value={option.cod} label={option.cod +' - '+ option.currency} />
                            )}
                            </Select>
                        </Col>

                        <Col md="5">
                            <Select name="currencyTo" defaultValue="ARS" md="6" ref={el => { this.currencyTo = el; }} >
                            { this.state.select.map((option, i) => 
                                <Option key={option.cod} value={option.cod} label={option.cod +' - '+ option.currency} />
                            )}
                            </Select>
                        </Col>
                        <Button color="primary">Calculate</Button>
                    </form>
                    <Grid container spacing={3} style={this.state.exchange.moneda ? {}: { display: 'none' }}>
                        <Grid item xs={12}>
                            <Card xs={12} style={{backgroundColor: '#CFFF7E'}}>
                                <CardActionArea xs={12}>
                                    <CardContent xs={12}>
                                        <span className="mui--text-display1" >{this.state.exchange.moneda}</span>
                                        <div className="mui--divider-top" >
                                            1 {this.state.exchange.moneda}  => {this.state.exchange.precio} {this.state.exchangeFromTo[1]}
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            );
        } else {
            return ( <div><LinearProgress color="secondary" /> Waiting for currencies... </div> );
        }       
    }
}

export default ExchangeBody;