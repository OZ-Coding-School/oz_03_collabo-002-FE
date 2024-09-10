import { motion } from 'framer-motion';

type EmptyDataProps = {
  message: string;
}

const EmptyData = ({message}: EmptyDataProps) => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 1 }}
        className="inline-flex w-full aspect-square text-gray-500"
      >
        <span className="m-auto w-5/6 text-gray text-xl text-center">
          {message}
        </span>
      </motion.div>
  )
}

export default EmptyData