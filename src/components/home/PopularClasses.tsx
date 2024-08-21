import { Class } from '../../store/useClassStore';
import ClassCard from '../common/ClassCard';

const exampleClass: Class = {
  id: '1',
  name: 'Example Class',
  owner: 'John Doe',
  date: [
    {
      startDate: '2024-08-01',
      endDate: '2024-08-10',
    },
  ],
  people: {
    max: 10,
    require: 5,
  },
  averageScore: 4.5,
  popular: true,
  price: 100,
  discountRate: 20,
  discountPrice: 80,
  description: 'This is an example class description.',
  photoGallery: ['https://example.com/photo1.jpg'],
  photoFinished: ['https://example.com/photo2.jpg'],
  place: {
    state: 'California',
    city: 'Los Angeles',
    address: '123 Main St',
  },
  createAt: '2024-07-01',
};
const PopularClasses = () => {
  return (
    <div>
      <h3 className="text-[20px] font-semibold">Popular Classes</h3>
      <ClassCard classItem={exampleClass} tag="BEST" />
    </div>
  );
};

export default PopularClasses;
