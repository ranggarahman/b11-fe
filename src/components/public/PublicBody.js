import React, { lazy, Suspense } from 'react'
import welcomeimage from '../../assets/welcome-page-3.jpg'
import Spinner from '../../utils/Spinner';
const LazyImage = lazy(() => import('../../utils/LazyImage'));

const PublicBody = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 hidden lg:block relative">
        <Suspense fallback={<Spinner/>}>
          <LazyImage
            src={welcomeimage}
            alt="Image"
            className="absolute w-full h-full object-cover"
          />
        </Suspense>
      </div>
        <div className="w-full p-8 md:p-10 sm:p-16 bg-gray-100 lg:py-48">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What is Chicken Counter?
          </h2>
          <p className="text-gray-600 sm:pr-40 text-justify">
          "Chicken Counter" is an innovative IoT application that employs the ESP32-CAM 
          to capture images of chickens in a coop and utilizes advanced machine learning algorithms to provide 
          real-time estimates of the current chicken population. This groundbreaking technology offers accurate and efficient monitoring of poultry farms, 
          ensuring precise data for better farm management.  
          </p>
        </div>
      </div>
  )
}

export default PublicBody