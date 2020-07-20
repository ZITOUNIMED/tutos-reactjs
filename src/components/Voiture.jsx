import React from 'react';

import { of, Observable, Subscription } from 'rxjs';


class Voiture extends React.Component {
    subscription$ : Subscription;
    constructor(props){
        super(props);

        this.state = {
            voiture: {
                marque: props.marque,
                age: props.age ? props.age : 1,
                prix: 0
            },
        };

        this.incrementerAge = this.incrementerAge.bind(this);
    }

    getVoiturePrix(marque): Observable<any> {
        let prix= 0;
        switch(marque){
            case 'BMW': prix = 40000; break;
            case 'RENAULT': prix = 30000; break;
            case 'PEUGEOT': prix = 20000; break;

            default: prix = 10000;
         }
         return of(prix);
    }

    componentDidMount(){
       this.subscription$ = this.getVoiturePrix(this.state.voiture.marque).subscribe(prix => {
            this.setState({voiture: {...this.state.voiture, prix: prix}});
        });
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.age && previousProps.age !== this.state.voiture.age){
            this.setState({voiture: {...this.state.voiture, age: previousProps.age}});
        }

        if(previousState.voiture.age !== this.state.voiture.age){
            const prix = this.state.voiture.prix * 0.95;
            this.setState({voiture: {...this.state.voiture, prix: prix}});
        }
    }

    componentWillUnmount(){
        if(this.subscription$){
            this.subscription$.unsubscribe();
        }
    }

    incrementerAge() {
        this.setState({voiture: {...this.state.voiture, age: this.state.voiture.age + 1}});
    }

    render(){
        return <div>
           <p>Voiture!!</p>
           <p>Marque: {this.props.marque}</p>
           <p>Age: {this.state.voiture.age}</p>
           <p>Prix: {this.state.voiture.prix}</p>
           <button onClick={this.incrementerAge}>Année suivante</button><br/>
           <button onClick={() => this.props.checkExpensive? this.props.checkExpensive(this.state.voiture.prix): undefined}>Check Expensive</button>
        </div>
    }
}

export default Voiture;

