export interface ISliderState {
    currentImageDetails :{
        title : string;
        image : string;
    }
    currentDetailsImageArr : ISliderAction[]
}
interface ISliderAction {
    title : string;
    image : string;
}