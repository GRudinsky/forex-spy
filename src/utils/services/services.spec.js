import { list } from './list';

const fetch = global.fetch;

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
  }
];

describe('list', () => {
  it('should return products in the response', async () => {
    fetch.mockOnce(JSON.stringify(products));

    await list('someUrl').then((res) => {
      expect(fetch).toHaveBeenCalledWith('someUrl', { method: 'GET' });
      expect(res).toEqual(products);
    });
  });

  it('should return error in failed response', async () => {
    const errorResponse = new Error('Some Error');
    fetch.mockRejectOnce(errorResponse);

    await list('someUrl').catch((e) => {
      expect(e.message).toBe('Some Error');
    });
  });
});
