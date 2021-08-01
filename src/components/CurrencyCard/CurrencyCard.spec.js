import { mount } from 'enzyme';
import ProductCard from './ProductCard';

describe('<ProductCard />', () => {
  const product = {
    productId: 100024698,
    name: 'Rose Gold Shimmer Clutch Bag',
    description:
      '• Shimmer finish\n• Pleat design\n• Magnetic closure\n• Inner pocket\n• Detachable chain strap',
    price: 9.09,
    priceWas: 12.99,
    available: true,
    quantity: 6,
    lowOnStock: true,
    promotionBadge: '30% OFF',
    imageUrl: 'https://i8.amplience.net/i/Quiz/00100024698_XM?w=1024'
  };

  let wrapper;
  const props = {
    data: product,
    checkHandler: jest.fn()
  };
  beforeEach(() => {
    wrapper = mount(<ProductCard {...props} />);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display quantity numbers and LOW ON STOCK indicator when lowOnStock in data is true', () => {
    expect(wrapper.find({ id: 'quantityIndicator' }).text()).toBe('6 in stock');
    expect(wrapper.find({ id: 'lowStockIndicator' })).toHaveLength(1);
  });

  [{ available: false }, { quantity: 0 }].forEach((item) => {
    const [key, value] = Object.entries(item)[0];
    it(`should display Out of stock message and no LOW ON STOCK indicator when data ${key} is ${value}`, () => {
      const newProps = {
        ...props,
        data: {
          ...props.data,
          [key]: value
        }
      };
      wrapper.setProps({ ...newProps });
      wrapper.update();

      expect(wrapper.find({ id: 'quantityIndicator' }).text()).toBe(
        'OUT OF STOCK'
      );
      expect(wrapper.find({ id: 'lowStockIndicator' })).toHaveLength(0);
    });
  });

  it('should call checkHandler on checkBox change', () => {
    wrapper.find('input[type="checkBox"]').simulate('change', {
      target: { value: '100024698' }
    });
    expect(wrapper.props().checkHandler).toHaveBeenCalledTimes(1);
  });
});
