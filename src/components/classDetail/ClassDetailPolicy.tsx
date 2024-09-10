import { useRef, useState } from 'react';
import { IconOptionArw } from '../../config/IconData';

const ClassDetailPolicy = () => {
  const [isReservationVisible, setIsReservationVisible] = useState(false);
  const [isCancelationVisible, setIsCancelationVisible] = useState(false);
  const [isThingsToKeepInMindVisible, setIsThingsToKeepInMindVisible] =
    useState(false);
  const resPoliciesRef = useRef(null);

  return (
    <div>
      {/* Reservation Policy */}
      <div ref={resPoliciesRef} className="mt-20">
        <dl className="border-t border-t-1 border-t-gray-300">
          <dt className="px-6 py-7 text-[18px] font-semibold flex items-center justify-between">
            Reservation Process
            <button
              onClick={() => setIsReservationVisible(!isReservationVisible)}
            ></button>
            <span
              className={`${isReservationVisible ? 'rotate-180' : ''} transition`}
            >
              <IconOptionArw />
            </span>
          </dt>
          {isReservationVisible && (
            <dd className="px-6 py-7 pl-10 border-t border-t-1 border-t-gray-300">
              <strong>Reservation Process</strong>
              <ol className="list-decimal">
                <li>
                  Select 'Reserve' on the spot page and book your desired date
                  and number of participants.
                </li>
                <li>
                  Once your reservation is made, it will be confirmed within 2-3
                  days.
                </li>
                <li>
                  Ensure you arrive at the designated meeting point 10 minutes
                  before the scheduled time. The class will start promptly.
                </li>
                <li>
                  Please gather at <strong>Mad Night</strong>
                </li>
              </ol>
              <p className="mt-3">{/* Add address */}</p>
            </dd>
          )}
        </dl>

        <dl className="border-t border-t-1 border-t-gray-300">
          <dt className="px-6 py-7 text-[18px] font-semibold flex items-center justify-between">
            Cancelation Policy
            <button
              onClick={() => setIsCancelationVisible(!isCancelationVisible)}
            >
              <div
                className={`${isCancelationVisible ? 'rotate-180' : ''} transition`}
              >
                <IconOptionArw />
              </div>
            </button>
          </dt>
          {isCancelationVisible && (
            <dd className="px-6 py-7 pl-10 border-t border-t-1 border-t-gray-300">
              <strong>Cancelation Policy</strong>
              <ul className="list-disc">
                <li>4 days before the class: Full refund</li>
                <li>3 days before the class: 50% refund</li>
                <li>2 days before the class: No refund</li>
              </ul>
              <p>
                The cancellation fee policy is based on the class provider's
                business days.
              </p>
              <p>
                If a cancellation request is made on non-business days, the
                cancellation fee will be applied based on the next business day.
              </p>
              <p>(Non-business days: weekends and public holidays)</p>
            </dd>
          )}
        </dl>

        <dl className="border-t border-t-1 border-t-gray-300 border-b border-b-1 border-b-gray-300">
          <dt className="px-6 py-7 text-[18px] font-semibold flex items-center justify-between">
            Things To Keep In Mind
            <button
              onClick={() =>
                setIsThingsToKeepInMindVisible(!isThingsToKeepInMindVisible)
              }
            >
              <div
                className={`${isThingsToKeepInMindVisible ? 'rotate-180' : ''} transition`}
              >
                <IconOptionArw />
              </div>
            </button>
          </dt>
          {isThingsToKeepInMindVisible && (
            <dd className="px-6 py-7 pl-10 border-t border-t-1 border-t-gray-300">
              <ul className="list-disc">
                <li>
                  If the class is canceled due to the provider's circumstances,
                  you will be notified by email 1-2 days in advance.
                </li>
                <li>
                  Please arrive 10 minutes before the class starts. Latecomers
                  will not be accommodated.
                </li>
                <li>This class is held indoors.</li>
                <li>
                  The class requires a minimum of 2 participants & maximum of 10
                  participants to proceed.
                </li>
                <li>
                  This is not a private class and will include participants from
                  various countries. However, instruction will be given in
                  English, Japanese, Chinese, and Korean. (Please inform us in
                  advance which language you need.)
                </li>
                <li>
                  The class will proceed as scheduled even in rainy weather, and
                  no refunds will be provided for weather-related cancellations
                  during the class.
                </li>
                <li>
                  Recording or filming the instructor's explanations during the
                  class is prohibited.
                </li>
                <li>
                  Pets are not allowed, and there are no facilities for them.
                </li>
                <li>
                  If you have dietary restrictions or allergies, please inform
                  us in advance.
                </li>
                <li>
                  Cancellations and refunds due to natural disasters are not
                  possible, but date changes are allowed.
                </li>
                <li>
                  For reservation changes or other inquiries, please contact
                  customk7878@gmail.com.
                </li>
              </ul>
            </dd>
          )}
        </dl>
      </div>
    </div>
  );
};

export default ClassDetailPolicy;
