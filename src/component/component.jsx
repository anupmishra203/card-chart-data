import React from 'react';
import Axios from 'axios';
import Chart from "react-google-charts";
class MainComponent extends React.Component {

constructor(props){
    super(props);
    this.state={
        imgData : [],
        data :[

          ],
    }

}

componentDidMount =()=>{
    Axios.get('https://jsonplaceholder.typicode.com/photos').then(data=>{
    let albumObj = {};
    let chartData = [["Albumid", "Albumid", { role: "style" }]];
    
    data.data.forEach(element => {
        if(element.albumId<8){
            if(albumObj.hasOwnProperty(element.albumId)){
                albumObj[element.albumId] +=1
            }
            else{
                albumObj[element.albumId] = 1;
            }
        }
        
    });

    for(let ele in albumObj){
        let newArr = []
        newArr.push(ele)
        newArr.push(albumObj[ele])
        newArr.push('#0b99a7')
        chartData.push(newArr)

    }
    this.setState({
        imgData:data.data,
        data:chartData
    })

    }).catch(err=>{
        console.log(err)
    })
}

render(){
    const {imgData ,data} = this.state
    return(
        <React.Fragment>
            <header className="own-header px-3">
                <nav>
                    <ul className="header-menu-list list-unstyled mb-0">
                        <li>
                            Home
                        </li>
                    </ul>
                </nav>

            </header>

            {/* card section */}

            <section className="grid-container container-fluid">
                <div className="row">
                    {imgData && imgData.length>0 && imgData.map((data, index)=>(
                        index<5?
                    <div className="own-grid-wrapper d-flex flex-wrap" key={data.id}>
                    <div className="grid-wrapper">
                        <div className="img-wrapper position-relative">
                            <img src={data.url} className="mw-100" alt="card-img"/>
                            <div className="square-box-wrapper cursor"></div>

                        </div>
                        <div className="card-txt-wrapper p-3">
                            <div className="card-title-wrapper d-flex flex-wrap align-items-center mb-3">
                                <h3 className="card-title mb-0">
                                    Card Title
                                </h3>
                                <div className="card-dot-container ml-auto cursor">
                                    ...
                                </div>
                            </div>
                            <p className="card-txt-details">
                            {data.title}

                            </p>
                        </div>
                    </div>
                </div>:null
                    ))}
                    
                </div>
            </section>
        {/* chart section */}

        <Chart chartType="BarChart" width="100%" height="400px" data={data} />

        </React.Fragment>
        
    )
}

}

export default MainComponent