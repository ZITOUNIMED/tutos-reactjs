import React from 'react';

import Voiture from './Voiture';

class Stock extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isDesplayed: true,
            ageMinumale: 1,
        };

        this.getAge = this.getAge.bind(this);
    }

    checkExpensive(prix){
        if(prix> 30000){
             console.log('Too expensive!!');
        } else {
            console.log('It is cheap!!');
        }
    }

    getAge(marque){
        if(marque === 'BMW'){
            return this.state.ageMinumale + 5;
        } else if(marque === 'PEUGEOT'){
            return this.state.ageMinumale + 3;
        }
        return this.state.ageMinumale;
    }

    render(){
        const marques = ['BMW', 'PEUGEOT'];
        return <div>
               <button onClick={() => this.setState({...this.state, ageMinumale: this.state.ageMinumale + 1})}>
               Augmenter age minumale par 1</button>
               <button onClick={() => {
                this.setState({isDesplayed: !this.state.isDesplayed});
               }}>{this.state.isDesplayed ? 'Cacher' : 'Afficher'}</button>
                { this.state.isDesplayed ?

                <div>
                    {
                        marques.map(marque => <Voiture marque={marque} checkExpensive={this.checkExpensive} age={this.getAge(marque)} /> )
                    }

                    <Voiture marque='RENAULT'/>

                </div>
                 : ''  }
        </div>
    }

}

export default Stock;