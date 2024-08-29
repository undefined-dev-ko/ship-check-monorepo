import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Styled from './index.styles';

const settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function SimpleSlider({ contents }: { contents?: React.ReactElement[] }) {
  return (
    <Styled.Container>
      <div>
        <Slider {...settings}>
          {contents ? contents.map((content, index) => content) : null}
        </Slider>
      </div>
    </Styled.Container>
  );
}

export default SimpleSlider;
