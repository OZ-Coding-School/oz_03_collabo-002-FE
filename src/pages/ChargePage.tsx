import Order from '../components/order/Order';

const ChargePage = () => {
  const orderData = {
    classTitle: 'KOREAN COCKTAIL MASTER CLASS',
    date: '2024-08-07',
    time: '11:00 - 12:30',
    name: '',
    option: 'Master Class',
    numberOfPeople: 2,
    baseWorkshopAmount: 72,
    languageSupport: 3,
  };

  return (
    <div>
      <Order data={orderData} />
    </div>
  );
};

export default ChargePage;
