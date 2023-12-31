import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);
const Banner = () => {
  return (
    <div className=''>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={8000}
      >
        <div data-src="https://img.freepik.com/free-vector/ramadan-kareem-islamic-holy-month-festival-background_1055-17262.jpg?w=900&t=st=1686091482~exp=1686092082~hmac=835f12061c7486253c14f4cf5b95478dee68a6c369868d917d6422fc83bf1102" />
        <div data-src="https://img.freepik.com/free-vector/flat-horizontal-banner-template-islamic-ramadan-celebration_23-2150139550.jpg?size=626&ext=jpg&uid=R105766307&ga=GA1.2.1209151801.1673868797&semt=ais" />
        <div data-src="https://img.freepik.com/premium-photo/teaching-muslim-kid-read-quran_8595-15081.jpg?size=626&ext=jpg&uid=R105766307&ga=GA1.1.1209151801.1673868797&semt=ais" />
        <div data-src="https://img.freepik.com/free-vector/holy-kaaba-mecca-saudi-arabia-hand-drawn-sketch-vector-illustration_460848-10337.jpg?w=900&t=st=1686091699~exp=1686092299~hmac=7978f04f4fe63c8b102a4cd7664dd82dab7e240349eae53ecde8ccefea2c7272" />
        <div data-src="https://img.freepik.com/free-photo/islamic-new-year-concept-with-copy-space_23-2148611776.jpg?w=1060&t=st=1686093802~exp=1686094402~hmac=02aeda30cfc78d2e97822fe07b0e8bae3e3e577f4ff8aac319d85f07771ff1c8" />

      </AutoplaySlider>
    </div>
  )
};

export default Banner;