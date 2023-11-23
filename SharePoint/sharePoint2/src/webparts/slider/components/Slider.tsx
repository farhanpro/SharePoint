
import type { ISliderProps } from './ISliderProps';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import { ISliderState } from './ISliderState';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as React from 'react';




let sp: SPFI;
export default class Sliders extends React.Component<ISliderProps, ISliderState> {

  constructor(props:ISliderProps){
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      currentImageDetails :{
        title : "",
        image : "", 
      },
      currentDetailsImageArr : [],
  };
  
}

  componentDidMount(): void {
    sp.web.lists.getByTitle("Slider Images").items.select()()
    .then((items :any)=>{
      items.map((item : any) =>{

        this.setState({
        currentImageDetails:{title : item.Title,image :  item.Images},
        currentDetailsImageArr:[...this.state.currentDetailsImageArr,{"title" : item.Title, "image" :   item.Images}]})
      })  
      console.log("This Final data into the state",this.state.currentDetailsImageArr[0].image);
    })
  }

  renderSlider(): React.ReactNode {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    
    return (
      <Slider {...settings}>
        {this.state.currentDetailsImageArr.map((item, index) => {
          const temp2 = JSON.parse(item.image);
          return (
            <div key={index}>
              <h3>{item.title}</h3>
              <img  src={temp2.serverRelativeUrl} alt={item.title} />
            </div>
          );
        })}
      </Slider>
    );
  }

  public render(): React.ReactElement<ISliderProps> {
    return (
      <div>
        {this.renderSlider()}
      </div>
    );
  }
}
