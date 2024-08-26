import { Class } from '../../type/class';
import ClassCard from '../common/ClassCard';

const classes: Class[] = [
  {
    id: '1',
    name: 'Example Class 1',
    owner: 'John Doe',
    date: [
      {
        startDate: '2024-08-01',
        endDate: '2024-08-10',
        startTime: '09:00',
        endTime: '17:00',
        participants: 10,
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
    description: 'This is an example class description 1.',
    photoGallery: ['./Home/home-popular01.png'],
    photoFinished: ['./Home/home-popular01.png'],
    place: {
      state: 'Busan',
      city: 'Busan',
      address: '123 Main St',
    },
    createAt: '2024-07-01',
  },
  {
    id: '2',
    name: 'Example Class 2',
    owner: 'Jane Doe',
    date: [
      {
        startDate: '2024-08-15',
        endDate: '2024-08-20',
        startTime: '10:00',
        endTime: '16:00',
        participants: 8,
      },
    ],
    people: {
      max: 8,
      require: 4,
    },
    averageScore: 4.8,
    popular: true,
    price: 120,
    discountRate: 15,
    discountPrice: 102,
    description: 'This is an example class description 2.',
    photoGallery: ['./Home/home-popular02.png'],
    photoFinished: ['./Home/home-popular02.png'],
    place: {
      state: 'Seoul',
      city: 'Seoul',
      address: '456 Another St',
    },
    createAt: '2024-07-15',
    tag: 'NEW',
  },
];

const PopularClasses = () => {
  return (
    <div className="px-6">
      <h3 className="text-[20px] mb-5">
        <strong>Popular Classes</strong>
      </h3>
      <div className="grid grid-cols-2 gap-[15px]">
        {classes.map((classItem) => (
          <ClassCard
            key={classItem.id}
            classItem={classItem}
            tag={classItem.tag}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
