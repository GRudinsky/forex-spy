import { mount } from 'enzyme';
import ProductGrid from './ProductGrid';
import { list } from '../../utils/services';

jest.mock('../../utils/services');

const products = [
  {
    productId: 100024698,
    name: 'Rose Gold Shimmer Clutch Bag',
    description:
      '• Shimmer finish\n• Pleat design\n• Magnetic closure\n• Inner pocket\n• Detachable chain strap',
    price: 9.09,
    priceWas: 12.99,
    available: 'TRUE',
    quantity: 96,
    lowOnStock: 'FALSE',
    promotionBadge: '30% OFF',
    imageUrl: 'https://i8.amplience.net/i/Quiz/00100024698_XM?w=1024'
  },
  {
    productId: 100024699,
    name: 'Blue Jewel Clutch Bag',
    description:
      '• Jewel finish\n• Silver colour frame\n• Clip closure\n• Detachable chain strap\n• Synthetic',
    price: 9.99,
    priceWas: 18.99,
    available: 'TRUE',
    quantity: 3,
    lowOnStock: 'FALSE',
    promotionBadge: '47% OFF',
    imageUrl: 'https://i8.amplience.net/i/Quiz/00100024699_XM?w=1024'
  },
  {
    productId: 100024670,
    name: 'Blue Jewel Clutch Bag',
    description: '• Limited edition',
    price: 0.99,
    priceWas: 1.99,
    available: 'TRUE',
    quantity: 0,
    lowOnStock: 'FALSE',
    promotionBadge: '47% OFF',
    imageUrl: 'https://i8.amplience.net/i/Quiz/00100024699_XM?w=1024'
  }
];

describe('<ProductGrid />', () => {
  let wrapper;
  let props;

  describe('With SUCCESS response', () => {
    beforeEach(() => {
      list.mockImplementationOnce(() => products);
      wrapper = mount(<ProductGrid {...props} />);
    });

    afterEach(() => {
      wrapper = null;
      jest.resetAllMocks();
    });

    it('should display Loading message before receiving the response', () => {
      const newWrapper = mount(<ProductGrid {...props} />);
      const component = newWrapper.find('#loadingMessage');
      expect(component).toHaveLength(1);
    });

    it('should display 3 product cards with SUCCESS response and remove the checked items once the remove checked button has been clicked', () => {
      wrapper.update();
      let cardComponent = wrapper.find('ProductCard');
      expect(cardComponent).toHaveLength(3);

      expect(wrapper.find('#removeChecked__button')).toHaveLength(0);
      cardComponent
        .at(1)
        .find('input[type="checkBox"]')
        .simulate('change', { target: { value: 100024699 } });

      const button = wrapper.find('#removeChecked__button');
      expect(button.text()).toBe('Remove 1 selected product');

      cardComponent
        .at(2)
        .find('input[type="checkBox"]')
        .simulate('change', { target: { value: 100024670 } });

      expect(button.text()).toBe('Remove 2 selected products');

      button.simulate('click');

      expect(wrapper.find('#removeChecked__button')).toHaveLength(0);

      cardComponent = wrapper.find('ProductCard');

      expect(cardComponent).toHaveLength(1);
      expect(cardComponent.find('input[value=100024698]')).toHaveLength(1);
      expect(cardComponent.find('input[value=100024699]')).toHaveLength(0);
      expect(cardComponent.find('input[value=100024670]')).toHaveLength(0);
    });
  });

  describe('With Error response', () => {
    beforeEach(() => {
      list.mockImplementationOnce(() => new Error('Some Error'));
      wrapper = mount(<ProductGrid {...props} />);
    });

    afterEach(() => {
      wrapper = null;
      jest.resetAllMocks();
    });

    it('should render Error component with Error response', () => {
      wrapper.update();
      const component = wrapper.find('#errorMessage');
      expect(component).toHaveLength(1);
    });
  });
});
